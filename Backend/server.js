const express = require("express");
const app = express();
require("dotenv").config();

const { MongoClient } = require("mongodb");

async function main() {
  const uri = process.env.MongoDB_string;
  //    console.log(uri);
  const client = new MongoClient(uri);

  try {
    await client.connect();
    //    await listDatabases(client);
  } catch (e) {
    console.error(e);
  } finally {
    await client.close();
  }
}

main().catch(console.error);

app.listen(5000, () => {
  console.log("Server is running on port 5000");
});
