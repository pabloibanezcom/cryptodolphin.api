var fs = require('fs');

var generate = function () {
    generateTeams();
}

var generateTeams = function () {
    var result = [];
    var files = fs.readdirSync('./mapping/teams');
    files.forEach(function (file) {
        result = result.concat(require('./mapping/teams/' + file));
    });
    fs.writeFileSync('./mapping/teams.json', JSON.stringify(result));
    return;  
}

generate();

