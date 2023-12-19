const User = require("../models/userData");
// const Admin = require("../model/admin");
const bcrypt = require("bcrypt");
var jwt = require("jsonwebtoken");
const passport = require("passport");

const Signup = async (req, res) => {
  try {
    const { email, password } = req.body;

    // Check if all the fields are provided
    if (!email || !password) {
      return res.status(400).json({ error: "All fields are mandatory" });
    }

    // Validate email format using a regular expression
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return res.status(400).json({ error: "Invalid email address" });
    }

    // Validate password complexity using a regular expression
    // At least one uppercase, one lowercase, one number, one special character, and at least 8 characters long.
    const passwordRegex =
      /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[!@#$%^&*()_+[\]{};':"\\|,.<>?/~`]).{8,}$/;
    if (!passwordRegex.test(password)) {
      return res.status(400).json({
        error:
          "Invalid password. Password should be at least 8 characters long and include at least one uppercase, one lowercase, one number, and one special character.",
      });
    }

    // Check if the user already exists in the database
    const existsUser = await User.findOne({ email });
    if (existsUser) {
      return res.status(401).json({ error: "User Already Exists" });
    }

    // Encrypt the password
    const saltRounds = 10;
    const hashedPassword = await bcrypt.hash(password, saltRounds);

    // Save the user in the Database
    const user = await User.create({
      email: email,
      password: hashedPassword,
    });
    const payload = {
      user: {
        id: user._id,
        email: user.email,
      },
    };
    // Generate a web token
    const token = jwt.sign(payload, process.env.SECRET_KEY, {
      expiresIn: "2h",
    });

    // Set the HttpOnly cookie in the response
    res.cookie("jwtToken", token, {
      path: "/", // Set the cookie to be accessible from all routes
      maxAge: 2 * 60 * 60, // Set the cookie expiration time (2 hours in this example)
      sameSite: "lax", // Set the sameSite attribute for improved security
      secure: false, // Cookie expiration time (2 hours in this example)
    });

    user.password = undefined;

    return res.status(201).json({ user, token });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ error: "Internal Server Error" });
  }
};

const Signin = async (req, res) => {
  try {
    const { email, password } = req.body;

    // Check if all the fields are provided
    if (!email || !password) {
      return res.status(400).json({ error: "All fields are mandatory" });
    }

    // Check if the user exists in the database
    const user = await User.findOne({ email });

    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    // Validate the password using the isValidPassword method from the User model
    const isMatch = await user.isValidPassword(password);

    if (!isMatch) {
      return res.status(401).json({ error: "Invalid password" });
    }
    const payload = {
      user: {
        id: user._id,
        email: user.email,
      },
    };
    // Generate a web token if the authentication is successful
    const token = jwt.sign(payload, process.env.SECRET_KEY, {
      expiresIn: "2h",
    });
    // Set the HttpOnly cookie in the response
    res.cookie("jwtToken", token, {
      path: "/", // Set the cookie to be accessible from all routes
      maxAge: 2 * 60 * 60, // Set the cookie expiration time (2 hours in this example)
      sameSite: "lax", // Set the sameSite attribute for improved security
      secure: false, // Cookie expiration time (2 hours in this example)
    });
    // Attach the user object and token to the response
    user.token = token;
    user.password = undefined;

    return res.status(200).json({
      success: true,
      token,
      user,
      message: "User login successful",
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ error: "Internal Server Error" });
  }
};


const logout = (req, res) => {
  // Clear the JWT token cookie by setting it to an empty value and expiring it immediately
  res.clearCookie("jwtToken").json({ message: "Logged out successfully" });
};

module.exports = {
  Signup,
  Signin,
  logout,
};
