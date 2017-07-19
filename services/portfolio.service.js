const Promise = require('promise');
const Portfolio = require('../app/models/portfolio');
const balanceService = require('./balance.service');

const portfolioService = {};

portfolioService.getPortfolios = () => {
    return new Promise(function (resolve, reject) {
        Portfolio.find({})
            .then(portfolios => {
                resolve(portfolios.map(p => {
                    return {
                        id: p._id,
                        name: p.name,
                        registrationDate: p.registrationDate,
                        lastAccessDate: p.lastAccessDate
                    };
                }));
            });
    });
}

portfolioService.getPortfolio = (id) => {
    return new Promise(function (resolve, reject) {
        Portfolio.findById(id, (err, portfolio) => {
            portfolio.balances = balanceService.generate(portfolio, Date.now());
            resolve(portfolio);
        });
    });
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


module.exports = portfolioService;