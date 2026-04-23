const { MongoClient } = require("mongodb");

const uri =
  "mongodb://skku_user2:skku123456@cluster0.7poqp8f.mongodb.net:27017/skku_bank?ssl=true&replicaSet=atlas-7poqp8f-shard-0&authSource=admin";

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
