var _ = require('lodash');
const teams = require('../mapping/teams');

var teamsService = {};

teamsService.getTeam = function (teamAVKey) {
    return teamsService.createTeam(_.find(teams, function (t) { return t.avKeys.indexOf(teamAVKey) > -1 }), teamAVKey);
};

teamsService.createTeam = function (team, avKey) {
    return team ? { key: team.key, name: team.name, country: team.country } : { key: null, name: avKey, country: null };
}

teamsService.getTeams = function (eventName) {
    var teams = eventName.split("-");
    if (teams.length != 2) {
        return null;
    }
    return {
        team1: teamsService.getTeam(teams[0].trim()),
        team2: teamsService.getTeam(teams[1].trim())
    };
}

module.exports = teamsService;