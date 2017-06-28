// load up the user model
var User = require('../app/models/user');

var userService = {};

userService.getUser = (req) => {
    return User.find({ 'facebookId': req.session.passport.user.facebookId });
}

module.exports = userService;