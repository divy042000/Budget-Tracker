const passport = require("passport");
const LocalStrategy = require("passport-local").Strategy;
const JwtStrategy = require("passport-jwt").Strategy;
const ExtractJwt = require("passport-jwt").ExtractJwt;
const User = require("../models/userData");
const GoogleStrategy = require("passport-google-oauth20").Strategy;
const { SECRET_KEY } = process.env;

passport.serializeUser((user, done) => {
  done(null, user.id);
});

passport.deserializeUser((id, done) => {
  User.findById(id).then((user) => {
    done(null, user);
  });
});

// Local strategy for email and password validation
passport.use(
  new LocalStrategy(
    {
      usernameField: "email",
      passwordField: "password",
    },
    async (email, password, done) => {
      try {
        // Check if the user exists in the database
        const user = await User.findOne({ email });

        if (!user) {
          console.log("User not found in the database.");
          return done(null, false, { message: "User not found" });
        }

        // Validate the password
        const isMatch = await user.isValidPassword(password);
        if (!isMatch) {
          return done(null, false, { message: "Invalid password" });
        }

        // If the user and password are valid, return the user
        return done(null, user);
      } catch (error) {
        return done(error);
      }
    }
  )
);

// JWT strategy for authorization
const jwtOptions = {
  jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
  secretOrKey: SECRET_KEY,
};

passport.use(
  new JwtStrategy(jwtOptions, async (payload, done) => {
    try {
      // Check if the user exists in the database
      const user = await User.findById(payload.id);

      if (!user) {
        return done(null, false, { message: "User not found" });
      }

      // If the user exists, return the user
      return done(null, user);
    } catch (error) {
      return done(error);
    }
  })
);

passport.use(
  "google",
  new GoogleStrategy(
    {
      callbackURL: "/auth/google/callback",
      clientID: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    },
    function (accessToken, refreshToken, profile, done) {
      User.findOne({ googleId: profile.id }).then((currentUser) => {
        if (currentUser) {
          // already have this user
          console.log("user is: ", currentUser);
          done(null, currentUser);
        } else {
          // if not, create user in our db
          new User({
            googleId: profile.id,
            email: profile.emails[0].value,
          })
            .save()
            .then((newUser) => {
              console.log("created new user: ", newUser);
              done(null, newUser);
            });
        }
      });
    }
  )
);
