'use strict';

var IndexModel = require('../models/index');
// var Cookies = require('../helper/cookies');
// var Crypto = require('../helper/crypto');
var request = require("request");

exports.index = function (req, res) {
    var model = new IndexModel();



    request(appSettings.api, function (error, response, body) {
        if (!error && response.statusCode == 200) {
            var result = JSON.parse(body);
            res.render('index', result);
            // res.render('apartments', result);
        }else{
            res.render('index', model);
        }
    });
}
