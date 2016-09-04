'use strict';
var request = require("request");
var IndexModel = require('../models/index');
var Cookies = require('../helper/cookies');
var Crypto = require('../helper/crypto');

var model = new IndexModel();

exports.associate = function(req, res){

    res.writeHead(200, {'Content-Type': 'application/json; charset=utf-8'});

    if(!req.query.keyword || req.query.keyword.trim()==""){
        res.end(JSON.stringify(model));
        return;
    }
    console.log(req.query.keyword);
    var uri = appSettings.api+"/search/hot?keyword="+encodeURIComponent(req.query.keyword.trim());

    request(uri, function (error, response, body) {
        if (!error && response.statusCode == 200) {
            var result = JSON.parse(body);

            var hots=new Array();
            var j=0;
            for(var i=0;i<result.cities.length;i++){
                if(j==15) break;
                result.cities[i].url="/apartments?city="+result.cities[i].id;
                hots.push(result.cities[i]);
                j++;
            }
            for(var i=0;i<result.colleges.length;i++){
                if(j==15) break;
                result.colleges[i].url="/apartments?city=1&college="+result.colleges[i].id;
                hots.push(result.colleges[i]);
                j++;
            }
            for(var i=0;i<result.apartments.length;i++){
                if(j==15) break;
                result.apartments[i].url="/apartment_"+result.apartments[i].id+".html";
                hots.push(result.apartments[i]);
                j++;
            }
            res.end(JSON.stringify(hots));
        }
    });
};

exports.schedule =  function (req, res){
    var userId=0;
    var cookies = new Cookies(req,res);
    if(cookies.get("id")){
        userId=Crypto.decrypt(cookies.get("id"));
    }
    var options = {
        url:appSettings.api+"/schedule",
        headers: {
            "Content-Type": 'application/x-www-form-urlencoded'
        },
        form:{
            "userId":userId,
            "name":req.body.name,
            "mobile":req.body.mobile,
            "email":req.body.email,
            "status":0,
            "startTime":req.body.startTime,
            "endTime":req.body.endTime,
            "apartmentId":req.body.apartmentId,
            "roomId":req.body.roomId
        }
    };
    request.put(options, function(err,response,body){
        if (!err && response.statusCode == 200) {
            var result = body;
            res.end(result);
            return;
        }
        res.end(0);
    });
}


exports.apply =  function (req, res){
    var userId=0;
    var cookies = new Cookies(req,res);
    if(cookies.get("id")){
        userId=Crypto.decrypt(cookies.get("id"));
    }
    var options = {
        url:appSettings.api+"/schedule/apply",
        headers: {
            "Content-Type": 'application/x-www-form-urlencoded'
        },
        form:{
            "userId":userId,
            "createId":userId,
            "name":req.body.name,
            "gender":req.body.gender,
            "birthday":req.body.birthday,
            "mobile":req.body.mobile,
            "email":req.body.email,
            "status":0,
            "university":req.body.university,
            "major":req.body.major,
            "enterDate":req.body.enterDate,
            "creditName":req.body.creditName,
            "creditCard":req.body.creditCard,
            "creditSecurity":req.body.creditSecurity,
            "startDate":req.body.startDate,
            "expireDate":req.body.expireDate,
            "assureName":req.body.assureName,
            "assureGender":req.body.assureGender,
            "assureRelation":req.body.assureRelation,
            "assureBirthday":req.body.assureBirthday,
            "assureMobile":req.body.assureMobile,
            "assureAddress":req.body.assureAddress
        }
    };
    request.put(options, function(err,response,body){
        if (!err && response.statusCode == 200) {
            var result = body;
            res.end(result);
            return;
        }
        res.end(0);
    });
}

