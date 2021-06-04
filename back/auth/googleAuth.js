
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const User = require('./models/user');

module.exports = function (passport) {
    passport.serializeUser((user, done) => {
        done(null, user.id);
    });

    passport.deserializeUser((id, done) => {
        User.findById(id, (err, user) => done(err, user));
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
                    email: profile.emails[0].value,
                    isGoogle: true,
                    isVerified: true
                }
            
                try {
                  let user = await User.findOne({ googleId: profile.id })

                  if (user) {
                        done(null, user);
                        res.status(200).send(newUser);
                  } else {
                        user = await User.create(newUser);
                        done(null, user);
                        res.status(200).send(newUser);
                  }
                } catch (err) {
                  console.error(err);
                }
            }
        )
    );
}