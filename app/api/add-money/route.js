import { MongoClient } from 'mongodb';

const uri = process.env.MONGODB_URI;

export async function POST(request) {
  try {
    const { phone, amount } = await request.json();
    
    const client = new MongoClient(uri);
    await client.connect();
    const db = client.db('wire_transfer_bank');
    const users = db.collection('users');
    
    await users.updateOne(
      { phone: phone },
      { $inc: { balance: amount } }
    );
    
    await client.close();
    
    return Response.json({ success: true, message: 'Balance updated' });
    
  } catch (error) {
    return Response.json({ success: false, error: error.message }, { status: 500 });
  }
}
