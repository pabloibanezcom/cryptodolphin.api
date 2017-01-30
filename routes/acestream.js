var express = require('express');
var router = express.Router();
var http = require("http");
var cheerio = require('cheerio')
var _ = require('lodash');
var avService = require('../services/arenavision.service');

var requestOptions = {
  host: 'arenavision.in',
  port: 80,
  headers: { 'Cookie': 'beget=begetok' }
};

router.get('/events', function (req, res, next) {
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


router.get('/:channel', function (req, res, next) {
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

module.exports = router;
