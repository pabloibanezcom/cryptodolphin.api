var http = require("http");
var userService = require('../services/user.service');
var coinsService = require('../services/coins.service');
var portfolioService = require('../services/portfolio.service');
var generationService = require('../services/generation.service');

module.exports = (app, passport) => {

    // =====================================
    // TEST ==============================
    // =====================================
    app.get('/api/test',
        //passport.authenticate('facebook-token'),
        (req, res) => {
            // generationService.all();
            // res.send('Hecho');
            coinsService.getCoins()
                .then(coins => res.send(coins))
                .catch(error => console.log(error));
        });

    // =====================================
    // COINS ==============================
    // =====================================
    app.get('/api/coins',
        passport.authenticate('facebook-token'),
        (req, res) => {
            coinsService.getCoins()
                .then(coins => res.send(coins))
                .catch(error => console.log(error));
        });

    // =====================================
    // PORTFOLIOS ==============================
    // =====================================
    app.get('/api/portfolios',
        passport.authenticate('facebook-token'),
        (req, res) => {
            portfolioService.getPortfolios()
                .then(p => res.send(p))
                .catch(error => console.log(error));
        });

    // =====================================
    // PORTFOLIOS BALANCES ==============================
    // =====================================
    app.get('/api/portfolio/:portfolioId/balances',
        passport.authenticate('facebook-token'),
        (req, res) => {
            portfolioService.getPortfolioBalances(req.params.portfolioId)
                .then(b => res.send(b))
                .catch(error => console.log(error));
        });

    // =====================================
    // USERS ==============================
    // =====================================
    app.get('/api/user',
        passport.authenticate('facebook-token'),
        (req, res) => {
            userService.getUser(req)
                .then(users => res.send(users[0]))
                .catch(error => console.log(error));
        });
};
