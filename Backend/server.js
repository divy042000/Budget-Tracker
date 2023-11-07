const express = require("express");
const app = express();
require("dotenv").config();
const mongoose = require('mongoose');


mongoose.connect(process.env.MongoDB_string, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => {
        console.log('Connected to database');
    })
    .catch((error) => {
        console.error('Error connecting to database', error);
    });



app.listen(5000, () => {
  console.log("Server is running on port 5000");
});
