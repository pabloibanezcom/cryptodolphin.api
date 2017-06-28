const Coin = require('../app/models/coin');
const Portfolio = require('../app/models/portfolio');
const coins = require('../data/coins');
const transactions = require('../data/transactions');
const portfolioService = require('../services/portfolio.service');
const coinsService = require('../services/coins.service');

const generationService = {};

generationService.all = () => {
    generationService.transactions();
}

generationService.coins = () => {
    coins.forEach(coin => {
        createNewCoin(coin);
    });
}

generationService.portfolio = () => {
    createNewPortfolio();
}

generationService.transactions = () => {
    createTransactions();
}

const createNewCoin = (coin) => {
    const newCoin = new Coin({
        name: coin.name,
        coinName: coin.coinName,
        fullName: coin.fullName,
        sortOrder: coin.sortOrder,
        color: coin.color,
        fontColor: coin.fontColor
    });
    newCoin.save(err => {
        if (err) return handleError(err);
    });
}

const createNewPortfolio = () => {
    coinsService.getCoins()
        .then(coins => {
            const newPortfolio = new Portfolio({
                name: 'My portfolio',
                registrationDate: Date.now(),
                lastAccessDate: Date.now(),
                coins: coins
            });
            newPortfolio.save(err => {
                if (err) return handleError(err);
            });
        })
        .catch(error => console.log(error));

}

const createTransactions = () => {
    let myPortfolio;
    portfolioService.getPortfolios()
    .then(res => {
        myPortfolio = res[0];
        myPortfolio.transactions = [];
        myPortfolio.save((err, updatedPortfolio) => {
            if (err) return handleError(err);
            transactions.forEach(t => portfolioService.addTransaction(updatedPortfolio._doc._id, t));
        });
    })
    .catch(error => console.log(error));
}

module.exports = generationService;