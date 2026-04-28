const { MongoClient } = require('mongodb');

const uri = process.env.MONGODB_URI || "mongodb+srv://SKKU:UTHMaN14@skku-bank.2vifo7x.mongodb.net/skku_bank";

async function test() {
  try {
    const client = new MongoClient(uri);
    await client.connect();
    console.log("✅ Connected to MongoDB!");
    const db = client.db("skku_bank");
    const users = await db.collection("users").find({}).limit(1).toArray();
    console.log(`📊 Found ${users.length} users in database`);
    await client.close();
  } catch (error) {
    console.log("❌ Error:", error.message);
  }
}

test();
