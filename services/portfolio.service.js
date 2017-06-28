const Promise = require('promise');
const Portfolio = require('../app/models/portfolio');
const balanceService = require('./balance.service');

const portfolioService = {};

portfolioService.getPortfolios = () => {
    return Portfolio.find({});
}

portfolioService.addTransaction = (portfolioId, transaction) => {
    // We search for the portfolio first
    Portfolio.findById(portfolioId, (err, portfolio) => {
        if (err) return handleError(err);

        portfolio.transactions.push(transaction);
        portfolio.save((err, updatedPortfolio) => {
            if (err) return handleError(err);
            return updatedPortfolio;
        });
    });
}

portfolioService.getPortfolioBalances = (portfolioId) => {
    return new Promise(function (resolve, reject) {
        getPortfolio(portfolioId)
            .then(p => {
                resolve(balanceService.generate(p, Date.now()));
            });
    });
}

const getPortfolio = (id) => {
    return new Promise(function (resolve, reject) {
        Portfolio.findById(id, (err, portfolio) => {
            resolve(portfolio._doc);
        });
    });
}

module.exports = portfolioService;