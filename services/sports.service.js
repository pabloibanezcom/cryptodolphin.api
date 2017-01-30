var _ = require('lodash');
const sports = require('../mapping/sports');

var sportsService = {};

sportsService.getSport = function (sportAVKey) {
    return sportsService.createSport(_.find(sports, function (s) { return s.avKeys.indexOf(sportAVKey) > -1 }), sportAVKey);
};

sportsService.createSport = function (sport, avKey) {
    return sport ? _.assign({}, sport, { "competitions": [], "events": 0 }) :
        { avKeys: [avKey], key: null, name: avKey, order: 9999, competitions: [], events: 0 };
}

module.exports = sportsService;