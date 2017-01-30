var moment = require('moment');

var util = {};

util.capitalize = function (string) {
    return string.charAt(0).toUpperCase() + string.slice(1).toLowerCase();
};

util.createDate = function(day, time) {
    var dayObj = moment(day, "DD/MM/YYYY");
    var timeObj = moment(time, "HH:mm CET");
    dayObj.hour(timeObj.hour());
    dayObj.minute(timeObj.minute());
    return dayObj.toDate();
}

util.createDayLabel = function(date) {
    return moment(date).format('dddd Do MMMM');
}

util.replaceHtmlSpace = function(value) {
    return value.replace("\n\t\t", " ");
}

util.readFromTr = function(child, capitalize) {
    var result = this.replaceHtmlSpace(child.text().trim());
    return capitalize ? this.capitalize(result) : result;
}

util.get2letterLanguage = function (lan) {
    return lan === "SPA" ? "es" : "en";
}

module.exports = util;