// load the things we need
var mongoose = require('mongoose');
var bcrypt = require('bcrypt-nodejs');

// define the schema for our user model
var coinSchema = mongoose.Schema({
    name: String,
    coinName: String,
    fullName: String,
    sortOrder: Number,
    color: String,
    fontColor: String
});

// create the model for users and expose it to our app
module.exports = mongoose.model('Coin', coinSchema);