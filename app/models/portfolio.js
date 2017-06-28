// load the things we need
var mongoose = require('mongoose');
var Schema = require('mongoose').Schema;
var bcrypt = require('bcrypt-nodejs');

var Coin = require('./coin');

// define the schema for our user model
var portfolioSchema = Schema({
    name: String,
    registrationDate: Date,
    lastAccessDate: Date,
    coins: [
        {
            name: String,
            coinName: String,
            fullName: String,
            sortOrder: Number,
            color: String,
            fontColor: String
        }
    ],
    transactions: [
        {
            id: Schema.Types.ObjectId,
            date: Date,
            coin_src: String,
            amount_src: Number,
            coin_dst: String,
            amount_dst: Number,
            price: Number
        }
    ],
    balances: [
        {
            date: Date,
            coins: Schema.Types.Mixed
        }
    ]
});

// create the model for users and expose it to our app
module.exports = mongoose.model('Portfolio', portfolioSchema);