import { MongoClient } from 'mongodb';

export async function POST(request) {
  try {
    const { fullName, email, phone, password } = await request.json();
    
    const client = new MongoClient(process.env.MONGODB_URI);
    await client.connect();
    const db = client.db('wire_transfer_bank');
    const users = db.collection('users');
    
    const existingUser = await users.findOne({ $or: [{ email }, { phone }] });
    if (existingUser) {
      await client.close();
      return Response.json({ success: false, error: 'User already exists' }, { status: 400 });
    }
    
    const newUser = {
      fullName,
      email,
      phone,
      password,
      balance: 0,
      createdAt: new Date(),
      accountNumber: phone
    };
    
    await users.insertOne(newUser);
    await client.close();
    
    return Response.json({ 
      success: true, 
      message: 'User created successfully',
      user: { fullName, email, phone, accountNumber: phone }
    });
    
  } catch (error) {
    return Response.json({ success: false, error: error.message }, { status: 500 });
  }
}
