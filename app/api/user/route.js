import { MongoClient } from 'mongodb';

const uri = process.env.MONGODB_URI;

export async function GET(request) {
  try {
    const { searchParams } = new URL(request.url);
    const phone = searchParams.get('phone');
    
    const client = new MongoClient(uri);
    await client.connect();
    const db = client.db("wire_transfer_bank");
    const users = db.collection('users');
    
    const user = await users.findOne({ phone });
    await client.close();
    
    if (!user) {
      return Response.json({ success: false, error: 'User not found' }, { status: 404 });
    }
    
    return Response.json({ 
      success: true, 
      user: { fullName: user.fullName, phone: user.phone }
    });
    
  } catch (error) {
    return Response.json({ success: false, error: error.message }, { status: 500 });
  }
}
