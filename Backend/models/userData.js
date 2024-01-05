const mongoose = require("mongoose");
const { Schema } = mongoose;

const userData = new Schema({
  username: String,
  email: String,
  password: String,
  profile: {
    firstName: String,
    lastName: String,
  },
  createdAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model("User", userData);
