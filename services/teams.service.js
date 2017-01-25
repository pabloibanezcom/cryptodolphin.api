var _ = require('lodash');
const teams = require('../mapping/teams');

var teamsService = {};

teamsService.getTeam = function (teamAVKey) {
    var result =_.find(teams, function (t) { return t.avKey === teamAVKey });
    return result;
};

teamsService.getTeams = function (eventName) {
    var teams = eventName.split("-");
    return {
        team1: teams[0] ? teamsService.getTeam(teams[0]) : null,
        team2: teams[1] ? teamsService.getTeam(teams[1]) : null
    };
}

module.exports = teamsService;