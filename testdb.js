const { MongoClient } = require('mongodb');
const uri = 'mongodb+srv://SKKU:UTHMaN14@skku-bank.2vifo7x.mongodb.net/skku_bank';
MongoClient.connect(uri)
  .then(function() { console.log('Connected to MongoDB'); })
  .catch(function(e) { console.log('Error:', e.message); });
