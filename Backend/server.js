const express = require("express");
const app = express();
const session = require("express-session");
const cookieParser = require("cookie-parser");
require("dotenv").config();
const cors = require("cors");
const passport = require("passport");
const mongoose = require("mongoose");

//middleware functions
app.use(
  session({
    resave: false,
    saveUninitialized: true,
    secret: process.env.SECRET_KEY,
  })
);
app.use(express.json());
app.use(cookieParser());
// app.use(cors());
app.use(
  cors({
    origin: "http://localhost:3000",
    credentials: true,
  })
);
app.use(passport.initialize());
app.use(passport.session());

mongoose
  .connect(process.env.MongoDB_string, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("Connected to database");
  })
  .catch((error) => {
    console.error("Error connecting to database", error);
  });

const authRoutes = require("./routes/authroutes");
app.use("/auth", authRoutes);
app.listen(5000, () => {
  console.log("Server is running on port 5000");
});
