var _ = require('lodash');
var util = require('./util');
var teamsService = require('./teams.service');
var competitions = require('../mapping/competitions');

var eventsService = {};

eventsService.order = function (events) {
    var result = [];

    //create sports
    for (var i = 0; i < events.length; i++) {
        if (events[i].name !== "" && events[i].competition != "Timezone") {
            var sport = null;
            var competition = null;
            var alreadyThere = false;
            for (var j = 0; j < result.length; j++) {
                if (result[j].name === events[i].sport) {
                    sport = result[j];
                    alreadyThere = true;
                }
            }
            if (!alreadyThere) {
                sport = { name: events[i].sport, competitions: [], events: 0 };
                result.push(sport);
            }
            //create competitions
            alreadyThere = false;
            for (var j = 0; j < sport.competitions.length; j++) {
                if (sport.competitions[j].avKey === events[i].competition) {
                    competition = sport.competitions[j];
                    alreadyThere = true;
                }
            }
            if (!alreadyThere) {
                competition = eventsService.getCompetition(events[i].competition);
                competition.events = [];
                sport.competitions.push(competition);
            }
            //create event
            eventsService.addEvent({
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
};

eventsService.createChannels = function (str) {
    var result = [];
    var values = str.split(" ");
    var channelNumbers = null;
    _.forEach(values, function (value, i) {
        if (value != "" && value[0] != "[") {
            channelNumbers = value.split("-");
            _.forEach(channelNumbers, function (channelNumber) {
                if (values[i + 1]) {
                    var channel = {
                        number: channelNumber,
                        language: eventsService.get2letterLanguage(values[i + 1].replace("[", "").replace("]", ""))
                    };
                    result.push(channel);
                }
            });
        }
    });
    return result;
}

eventsService.getCompetition = function (avKey) {
    for (var i = 0; i < competitions.length; i++) {
        if (competitions[i].avKey === avKey) {
            return _.assign({}, competitions[i], { "days": [] });
            //return competitions[i];
        }
    }
    return {
        "key": null,
        "avKey": avKey,
        "name": avKey,
        "country": null,
        "order": 9999,
        "days": []
    };
}

eventsService.get2letterLanguage = function (lan) {
    return lan === "SPA" ? "es" : "en";
}

eventsService.addEvent = function (event, day, competition) {
    var originalDay = _.find(competition.days, { 'label': day });
    if (!originalDay) {
        competition.days.push({"label": day, events: []});
    }
    _.find(competition.days, { 'label': day })['events'].push(event);
}

module.exports = eventsService;