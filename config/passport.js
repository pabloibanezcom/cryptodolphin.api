// load all the things we need
var FacebookTokenStrategy = require('passport-facebook-token');

// load up the user model
var User = require('../app/models/user');

// expose this function to our app using module.exports
module.exports = function (passport) {

    // used to serialize the user for the session
    passport.serializeUser(function (user, done) {
        done(null, user.id);
    });

    // used to deserialize the user
    passport.deserializeUser(function (id, done) {
        done(null, id);
    });

    passport.use('facebook-token', new FacebookTokenStrategy({
        clientID: process.env.FB_APP_KEY,
        clientSecret: process.env.FB_APP_SECRET
    },
        function (accessToken, refreshToken, profile, done) {

            User.find({}, function (err, users) {
                var authorizedUser = false;
                users.forEach(function (user) {
                    if (user._doc.facebookId === profile.id + '') {
                        authorizedUser = user;
                    }
                });
                return done(null, authorizedUser);
            });
        }
    ));

};