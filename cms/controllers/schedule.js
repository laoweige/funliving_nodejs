var IndexModel = require('../models/index');
var request = require("request");

exports.schedules = function (req, res) {
    var page=req.query.page?req.query.page:1;
    var uri = appSettings.api + "/schedule?page="+page;
    request(uri, function (error, response, body) {
        var model = new IndexModel();
        if (!error && response.statusCode == 200) {
            var result = JSON.parse(body);
            model.list = result;
            res.render('schedule/list', model);
            return;
        }
        res.render('schedule/list', model);
    });
};

exports.applies = function (req, res) {
    var page=req.query.page?req.query.page:1;
    var uri = appSettings.api + "/schedule/apply?page="+page;
    request(uri, function (error, response, body) {
        var model = new IndexModel();
        if (!error && response.statusCode == 200) {
            var result = JSON.parse(body);
            model.list = result;
            res.render('schedule/applies', model);
            return;
        }
        res.render('schedule/applies', model);
    });
};
