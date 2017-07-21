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
            coinsService.getCoins()
                .then(coins => res.send(coins))
                .catch(error => console.log(error));
        });

    // =====================================
    // COINS ==============================
    // =====================================
    app.get('/api/coins',
        //passport.authenticate('facebook-token'),
        (req, res) => {
            coinsService.getCoins()
                .then(coins => res.send(coins))
                .catch(error => console.log(error));
        });

    // =====================================
    // PORTFOLIOS ==============================
    // =====================================
    app.get('/api/portfolios',
        //passport.authenticate('facebook-token'),
        (req, res) => {
            portfolioService.getPortfolios()
                .then(p => res.send(p))
                .catch(error => console.log(error));
        });

    app.get('/api/portfolios/:portfolioId',
        //passport.authenticate('facebook-token'),
        (req, res) => {
            portfolioService.getPortfolio(req.params.portfolioId)
                .then(p => processResponse(res, p))
                .catch(error => console.log(error));
        });

    // =====================================
    // USERS ==============================
    // =====================================
    app.get('/api/user',
        passport.authenticate('facebook-token'),
        (req, res) => {
            userService.getUser(req)
                .then(users => processResponse(res, users[0]))
                .catch(error => console.log(error));
        });

    const processResponse = (res, result) => {
        if (result) {
            res.send(result);
        } else {
            res.status(404).send('Not found');
        }
    }
};
