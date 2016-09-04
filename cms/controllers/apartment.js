var IndexModel = require('../models/index');
var request = require("request");
var formidable = require('formidable');
var fs = require('fs');

exports.add = function (req, res) {
    var model = new IndexModel();
    res.render('apartment/add', model);
};

exports.upload = function (req, res) {
    var form = new formidable.IncomingForm();
    form.encoding = 'utf-8';
    form.uploadDir = "public/images";
    form.keepExtensions = true;
    form.maxFieldsSize = 2 * 1024 * 1024;
    form.type = true;
    form.parse(req, function(err, fields, files) {
        if (err) {
            var failure = new IndexModel();
            res.render('apartment/add', failure);
            return;
        }
        var avatarName = "./public/images/uploads/"+Date.parse(new Date()) + '.jps';
        fs.renameSync(files.carouselUpload.path, avatarName);
        res.send({
            code: 200,
            msg: avatarName
        });
    });
}

exports.postAdd = function (req, res) {
    var options = {
        url:appSettings.api+"/apartment",
        headers: {
            "Content-Type": 'application/x-www-form-urlencoded'
    },
        form:{
            "name":req.body.name,
            "city":req.body.city,
            "address":req.body.address,
            "postcode":req.body.postcode,
            "supplier":req.body.supplier,
            "description":req.body.description,
            "coordinate":req.body.coordinate,
            "rank":req.body.rank,
            "rent":req.body.rent,
            "facility":req.body.facility.join(",")
        }
    };

    request.put(options, function(err,response,body){
        if (!err && response.statusCode == 200) {
            var result = JSON.parse(body);
            console.log("result.id="+result.id);
            res.redirect("/apartment/room?id="+result.id);
            return;
        }
        var failure = new IndexModel();
        failure.message="提示：添加失败！";
        res.render('apartment/add', failure);
    });

};

exports.room = function (req, res) {

    var apartmentId = req.query.apartmentId;
    var uri = appSettings.api + "/apartment/room?apartmentId="+apartmentId;
    request(uri, function (error, response, body) {
        var model = new IndexModel();
        model.apartmentId = apartmentId;
        if (!error && response.statusCode == 200) {
            var result = JSON.parse(body);
            model.rooms = result;
            res.render('apartment/room', model);
            return;
        }
        res.render('apartment/room', model);
    });

};

exports.postRoom = function (req, res) {

    var apartmentId = req.query.apartmentId;
    console.log("req.query.apartmentId="+req.query.apartmentId);
    var options = {
        url:appSettings.api+"/apartment/room",
        headers: {
            "Content-Type": 'application/x-www-form-urlencoded'
        },
        form:{
            "name":req.body.name,
            "rent":req.body.rent,
            "type":req.body.type,
            "toilet":req.body.toilet,
            "kitchen":req.body.kitchen,
            "acreage1":req.body.acreage1,
            "acreage2":req.body.acreage2,
            "bed":req.body.bed,
            "status":req.body.status,
            "apartmentId":apartmentId
        }
    };
    request.put(options, function(err,response,body){
        if (!err && response.statusCode == 200) {
            var result = JSON.parse(body);
            console.log("result.id="+result.id);
            res.redirect("/apartment/room?apartmentId="+result.apartmentId);
            return;
        }
        res.redirect("/apartment/room?error=1&apartmentId="+result.apartmentId);
    });

};

exports.list = function (req, res) {
    var city=req.query.id?req.query.id:1;

    var uri = appSettings.api + "/apartment/city?id="+city;
    request(uri, function (error, response, body) {
        var model = new IndexModel();
        if (!error && response.statusCode == 200) {
            var result = JSON.parse(body);
            model.list = result;
            res.render('apartment/list', model);
            return;
        }
        res.render('apartment/list', model);
    });
};