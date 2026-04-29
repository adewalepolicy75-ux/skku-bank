import clientPromise from '../../../lib/mongodb';

export async function POST(request) {
  try {
    const { fromPhone, toPhone, amount } = await request.json();
    
    const client = await clientPromise;
    const db = client.db('wire_transfer_bank');
    const users = db.collection('users');
    
    const sender = await users.findOne({ phone: fromPhone });
    if (!sender) {
      return Response.json({ success: false, error: 'Sender not found' }, { status: 404 });
    }
    
    if (sender.balance < amount) {
      return Response.json({ success: false, error: 'Insufficient balance' }, { status: 400 });
    }
    
    const receiver = await users.findOne({ phone: toPhone });
    if (!receiver) {
      return Response.json({ success: false, error: 'Receiver not found' }, { status: 404 });
    }
    
    await users.updateOne(
      { phone: fromPhone },
      { $inc: { balance: -amount } }
    );
    
    await users.updateOne(
      { phone: toPhone },
      { $inc: { balance: amount } }
    );
    
    return Response.json({ 
      success: true, 
      message: `Successfully sent $${amount} to ${receiver.fullName}`,
      newBalance: sender.balance - amount
    });
    
  } catch (error) {
    return Response.json({ success: false, error: error.message }, { status: 500 });
  }
}
