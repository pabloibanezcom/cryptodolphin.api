var _ = require('lodash');
var cheerio = require('cheerio');
var util = require('../services/util');
var teamsService = require('./teams.service');
var competitionsService = require('./competitions.service');
var sportsService = require('./sports.service');
var channelsService = require('./channels.service');

var arenavisionService = {};

arenavisionService.process = function (data) {
    var events = [];
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
                "channels": channelsService.createChannels(util.readFromTr(children.eq(5)))
            };
            if (event.date) {
                events.push(event);
            }
        }
    });
    return JSON.stringify(generateResult(events))
}

arenavisionService.getChannelAS = function (data) {
    var result = "";
    var $ = cheerio.load(data)
    $('.auto-style1 a').each(function (i, a) {
        if (_.includes(a.attribs.href, "acestream://")) {
            result = {
                "acestream": a.attribs.href
            };
        }
    });
    return result;
}

var generateResult = function (events) {
    var result = [];

    //create sports
    for (var i = 0; i < events.length; i++) {
        if (events[i].name !== "" && events[i].competition != "Timezone") {
            //create sport
            var sport = _.find(result, function (c) { return c.avKeys.indexOf(events[i].sport) > -1 });
            if (!sport) {
                sport = sportsService.getSport(events[i].sport)
                result.push(sport);
            }
            //create competition
            var competition = _.find(sport.competitions, function (c) { return c.avKeys.indexOf(events[i].competition) > -1 });
            if (!competition) {
                competition = competitionsService.getCompetition(events[i].competition)
                sport.competitions.push(competition);
            }
            //create event
            competitionsService.addEvent({
                date: events[i].date,
                name: events[i].name,
                teams: teamsService.getTeams(events[i].name),
                channels: events[i].channels
            },
                util.createDayLabel(events[i].date),
                competition
            );

            //increment sport events counter
            sport.events++;
        }
    }
    return result;
}

module.exports = arenavisionService;