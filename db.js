// db.js
const { MongoClient } = require('mongodb');

const url = 'mongodb://127.0.0.1:27017'; // or your actual connection string
const dbName = 'recipebook';

let db;

const connectToDatabase = async () => {
  const client = new MongoClient(url);
  await client.connect();
  console.log('✅ Connected to MongoDB');
  db = client.db(dbName);
};

const getDb = () => {
  if (!db) {
    throw new Error('❌ DB not initialized');
  }
  return db;
};

module.exports = { connectToDatabase, getDb };


