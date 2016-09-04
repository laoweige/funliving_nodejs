'use strict';

var request = require("request");
var Cookies = require('../helper/cookies');
var Crypto = require('../helper/crypto');


exports.apply =  function (req, res){
    var uri = appSettings.api+"/schedule/"+req.query.id;
    request(uri, function (error, response, body) {
        if (!error && response.statusCode == 200) {
            var result = JSON.parse(body);
            res.render('apply', result);
        }
    });
}
