const { MongoClient } = require("mongodb");

async function test() {
  const uri = "mongodb://localhost:27017";
  const client = new MongoClient(uri);

  try {
    await client.connect();
    console.log("✅ Connected to local MongoDB");

    const db = client.db("skku_bank");
    console.log('✅ Database "skku_bank" is ready');
  } catch (err) {
    console.error("❌ Error:", err.message);
  } finally {
    await client.close();
  }
}

test();
