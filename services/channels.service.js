var _ = require('lodash');
var util = require('../services/util');

var channelsService = {};

channelsService.createChannels = function (str) {
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
                        language: util.get2letterLanguage(values[i + 1].replace("[", "").replace("]", ""))
                    };
                    result.push(channel);
                }
            });
        }
    });
    return result;
};

module.exports = channelsService;