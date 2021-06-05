
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const GoogleUser = require('./models/googleUsers');
const passport = require("passport");

module.exports = function () {
    passport.serializeUser((user, done) => {
        done(null, user.id);
    });
        
    passport.deserializeUser((id, done) => {
        GoogleUser.findById(id, (err, user) => done(err, user));
    });
        
    passport.use(
        new GoogleStrategy(
            {
                clientID: "926330184095-c8ej0ig4v1midq5cbh8ot6tbkbfi7p3t.apps.googleusercontent.com",
                clientSecret: "Wm4KXNsn2jF1Pg7DJz-wp79W",
                callbackURL: "/auth/google/callback"
            },
            async (accessToken, refreshToken, profile, done) => {
                const newUser = {
                    email: profile.emails[0].value
                }
                    
                try {
                  let user = await GoogleUser.findOne({ email: profile.emails[0].value })
                  if (user) {
                        done(null, user);
                  } else {
                        user = await GoogleUser.create(newUser);
                        done(null, user);
                  }
                } catch (err) {
                  console.error(err);
                }
            }
        )
    );
}