const mongoose = require("mongoose");
const { Schema } = mongoose;

const userData = new Schema({
  username: String,
  email: String,
  password: String,
  firstName: String,
  lastName: String,
  age: Number,
  gender: String,
  phoneNumber: String,
  createdAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model("User", userData);
