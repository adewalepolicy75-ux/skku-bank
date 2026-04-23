const { MongoClient } = require("mongodb");

const uri =
  "mongodb+srv://skku_user2:skku123456@cluster0.7poqp8f.mongodb.net/skku_bank";

const client = new MongoClient(uri);

client
  .connect()
  .then(() => {
    console.log("Connected to MongoDB!");
    process.exit(0);
  })
  .catch((err) => {
    console.log("Error:", err.message);
    process.exit(1);
  });
