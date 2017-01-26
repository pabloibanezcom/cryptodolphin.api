var _ = require('lodash');
const teams = require('../mapping/teams');

var teamsService = {};

teamsService.getTeam = function (teamAVKey) {
    var result =_.find(teams, function (t) { return t.avKey === teamAVKey });
    return result ? result : { avKey: teamAVKey, key: null, name: teamAVKey, country: null };
};

teamsService.getTeams = function (eventName) {
    var teams = eventName.split("-");
    if(teams.length != 2) {
        return null;
    }
    return {
        team1: teamsService.getTeam(teams[0].trim()),
        team2: teamsService.getTeam(teams[1].trim())
    };
}

module.exports = teamsService;