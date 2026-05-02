const { MongoClient } = require('mongodb');
const uri = 'mongodb://localhost:27017';
const client = new MongoClient(uri);
client.connect()
  .then(() => console.log('Local MongoDB is running'))
  .catch(e => console.log('Error:', e.message));
