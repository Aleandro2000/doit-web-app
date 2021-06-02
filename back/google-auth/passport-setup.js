const passport = require("passport");
const GoogleStrategy = require('passport-google-oauth20').Strategy;

passport.use(new GoogleStrategy({
    clientID: "926330184095-c8ej0ig4v1midq5cbh8ot6tbkbfi7p3t.apps.googleusercontent.com",
    clientSecret: "Wm4KXNsn2jF1Pg7DJz-wp79W",
    callbackURL: "https://doit-315611.firebaseapp.com"
  },
  function(accessToken, refreshToken, profile, cb) {
    User.findOrCreate({ googleId: profile.id }, function (err, user) {
      return cb(err, user);
    });
  }
));