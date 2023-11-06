const express = require("express");
const app = express();
require("dotenv").config();
const MongoClient = require('mongodb').MongoClient;
const uri = process.env.MongoDB_string;
// console.log(uri);
const client = new MongoClient(uri);

client.connect(err => {
 if (err) {
   console.error('Failed to connect to MongoDB:', err);
   return;
 }

 console.log('Connected to MongoDB with state:', client.isConnected() ? 'Connected' : 'Not Connected');

 const collection = client.db("test").collection("devices");
 // perform actions on the collection object

 client.close();
});




app.listen(5000, () => {
  console.log("Server is running on port 5000");
});
