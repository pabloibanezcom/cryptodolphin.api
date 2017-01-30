var _ = require('lodash');
const competitions = require('../mapping/competitions');

var competitionsService = {};

competitionsService.getCompetition = function (compAVKey) {
    return competitionsService.createCompetition(_.find(competitions, function (c) { return c.avKeys.indexOf(compAVKey) > -1 }), compAVKey);
};

competitionsService.createCompetition = function (comp, avKey) {
    return comp ? _.assign({}, comp, { "days": [] }):
     {avKeys: [avKey], key: null, name: avKey, country: null, order: 9999, days: [] };
}

competitionsService.addEvent = function (event, day, competition) {
    var originalDay = _.find(competition.days, { 'label': day });
    if (!originalDay) {
        competition.days.push({ "label": day, events: [] });
    }
    _.find(competition.days, { 'label': day })['events'].push(event);
}

module.exports = competitionsService;