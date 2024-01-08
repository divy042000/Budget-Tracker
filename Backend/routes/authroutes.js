const express = require("express");
const router = express.Router();
const authcontroller = require("../controllers/authcontroller");
const middleware = require("../middlewares/passportmiddleware");
const isAuthenticated = require("../middlewares/authcheckuser");
var jwt = require("jsonwebtoken");
const passport = require("passport");
const cors = require("cors");

// Handle POST request for
// User sign up
router.post("/signup", authcontroller.Signup);
// User sign in
router.post("/signin", authcontroller.Signin);

// Use Passport.js middleware for protected routes
router.get(
  "/protected",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    // This route will be protected and can only be accessed by authenticated users
    // The authenticated user's information can be accessed through req.user
    res.json({ user: req.user });
  }
);
// Route for initiating Google OAuth authentication
router.get(
  "/google",
  cors({ origin: "http://localhost:5000", credentials: true }),
  passport.authenticate("google", {
    scope: ["profile", "email"],
    prompt: "consent",
  })
);
// Function to generate the JWT
const generateJWT = (user) => {
  const payload = {
    user: {
      id: user._id,
      email: user.email,
    },
  };

  const token = jwt.sign(payload, process.env.SECRET_KEY, {
    expiresIn: "2h",
  });

  return token;
};
// Callback route for handling the Google OAuth callback
router.get("/google/callback", (req, res, next) => {
  // Use a custom callback for passport.authenticate
  passport.authenticate("google", { session: false }, (err, user, info) => {
    if (err) {
      return next(err);
    }

    if (user) {
      // If the user is available (authenticated via Google), generate the JWT
      const token = generateJWT(user);
      console.log("suer ", user);
      const userData = {
        googleId: user.googleId,
        email: user.email,
        token: token, // include token here
        // Add any other user data you want to include
      };
      console.log("suedfahjdsfjkar ", userData);
      // console.log("Token in the routes :", token);
      // Set the JWT token as a cookie in the response
      res.cookie("jwtToken", userData.token, {
        path: "/", // Set the cookie to be accessible from all routes
        maxAge: 2 * 60 * 60, // Set the cookie expiration time (2 hours in this example)
        sameSite: "lax", // Set the sameSite attribute for improved security
        secure: false, // Set this to "true" if your frontend is served over HTTPS
      });

      // Send the user data along with the response
      return res.redirect("http://localhost:5000/user"); // Redirect to the user page
    } else {
      // If the user is not authenticated via Google, handle failed sign-in
      return res.redirect("http://localhost:5000/auth/signup");
    }
  })(req, res, next); // Invoke the custom callback function
});

// Logout
router.get("/logout", authcontroller.logout);

module.exports = router;
