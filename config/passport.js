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

            var fbuser = {
                'email': profile.emails[0].value,
                'name': profile.name.givenName + ' ' + profile.name.familyName,
                'id': profile.id + '',
                'token': accessToken
            }

            console.log('FB_USER', fbuser);

            User.find({}, function (err, users) {
                var authorizedUser = false;
                users.forEach(function (user) {
                    if (user._doc.facebookId == fbuser.id) {
                        authorizedUser = user;
                    }
                });
                return done(null, authorizedUser);
                // if (isAuthorized) {
                //     return done(null, user);
                // } else {
                //     return done(null, false, { message: 'User not allowed' });
                // }
            });

            // User.find({ facebookId: fbuser.id }, function (err, users) {
            //     console.log('USERS: ', users);
            //     console.log('ERROR: ', err);
            //     if (users.length > 0) {
            //         return done(null, users[0]);
            //     } else {
            //         return done(null, false, { message: 'User not allowed' });

            //     }
            // });
        }
    ));

};