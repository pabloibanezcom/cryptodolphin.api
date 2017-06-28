// load up the user model
var Coin = require('../app/models/coin');

var coinsService = {};

coinsService.getCoins = () => {
    return Coin.find({});
}

module.exports = coinsService;