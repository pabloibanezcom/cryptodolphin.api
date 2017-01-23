var express = require('express');
var router = express.Router();
var http = require("http");
var cheerio = require('cheerio')
var _ = require('lodash');
var util = require('../services/util');
var eventsService = require('../services/events.service');

var requestOptions = {
  host: 'arenavision.in',
  port: 80,
  headers: { 'Cookie': 'beget=begetok' }
};

router.get('/events', function (req, res, next) {
  requestOptions.path = "/schedule";
  res.setHeader('Content-Type', 'application/json');
  var json = { 'events': [] };
  http.get(requestOptions, function (resp) {
    resp.on('data', function (data) {
      var $ = cheerio.load(data)
      $('tr').each(function (i, tr) {
        if (i > 0) {
          var children = $(this).children();
          var event = {
            "date": util.createDate(util.readFromTr(children.eq(0)), util.readFromTr(children.eq(1))),
            "sport": util.readFromTr(children.eq(2), true),
            "competition": util.readFromTr(children.eq(3), true),
            "name": util.readFromTr(children.eq(4)),
            "channelsString": util.readFromTr(children.eq(5)),
            "channels": eventsService.createChannels(util.readFromTr(children.eq(5)))
          };
          if (event.date) {
            json.events.push(event);
          }
        }
      });
    });
    resp.on('end', function () {
      res.send(JSON.stringify(eventsService.order(json.events)));
    });
  }).on('error', function (e) {
    console.log(e);
  });
});


router.get('/:channel', function (req, res, next) {
  requestOptions.path = '/av' + req.params.channel;
  res.setHeader('Content-Type', 'application/json');
  var result = null;
  http.get(requestOptions, function (resp) {
    resp.on('data', function (data) {
      var $ = cheerio.load(data)
      $('.auto-style1').each(function (i, as) {
        $('a').each(function (i, a) {
          if(_.includes(a.attribs.href, "acestream://")) {
            result = {
              "acestream": a.attribs.href
            };
          }
        });
      });
    });
    resp.on('end', function () {
      res.send(result);
    });
  }).on('error', function (e) {
    console.log(e);
  });
});

module.exports = router;
