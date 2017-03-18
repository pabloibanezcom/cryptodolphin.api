var http = require("http");
var avService = require('../services/arenavision.service');
var userService = require('../services/user.service');

module.exports = function (app, passport) {

    // =====================================
    // EVENTS ==============================
    // =====================================
    app.get('/api/events',
        passport.authenticate('facebook-token'),
        function (req, res) {
            requestOptions.path = "/schedule";
            res.setHeader('Content-Type', 'application/json');
            var store = "";
            http.get(requestOptions, function (resp) {
                resp.on('data', function (data) {
                    store += data;
                });
                resp.on('end', function () {
                    res.send(avService.process(store));
                });
            }).on('error', function (e) {
                console.log(e);
            });
        });
    // =====================================
    // CHANNEL ==============================
    // =====================================
    app.get('/api/channel/:channel',
        passport.authenticate('facebook-token'),
        function (req, res) {
            requestOptions.path = '/av' + req.params.channel;
            res.setHeader('Content-Type', 'application/json');
            var store = "";
            http.get(requestOptions, function (resp) {
                resp.on('data', function (data) {
                    store += data;
                });
                resp.on('end', function () {
                    res.send(avService.getChannelAS(store));
                });
            }).on('error', function (e) {
                console.log(e);
            });
        });

    // =====================================
    // USERS ==============================
    // =====================================
    app.get('/api/users',
        passport.authenticate('admin'),
        function (req, res) {
            res.send(userService.getUsers());
        });

    var requestOptions = {
        host: 'arenavision.in',
        port: 80,
        headers: { 'Cookie': 'beget=begetok' }
    };
};
