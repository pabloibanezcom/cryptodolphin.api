// load up the user model
var User = require('../app/models/user');

var userService = {};

userService.getUsers = function () {
    var result = [];
    User.find({}, function (err, users) {
        return users;
    });
}

module.exports = userService;