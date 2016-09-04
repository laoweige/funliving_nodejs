'use strict';

var IndexModel = require('../models/index');
var request = require("request");
var Cookies = require('../helper/cookies');
var Crypto = require('../helper/crypto');


exports.index = function (req, res) {
    var model = new IndexModel();




    model.list=new Array();
    model.list.push(1);
    model.list.push(2);
    model.list.push(3);
    res.render('index', model);
}

exports.login =  function (req, res){
    var options = {
        url:appSettings.api+"/users/login",
        headers: {
            "Content-Type": 'application/x-www-form-urlencoded'
        },
        form:{
            "mobile":req.body.mobile,
            "password":req.body.password
        }
    };
    request.post(options, function(err,response,body){
        if (!err && response.statusCode == 200) {
            var result = JSON.parse(body);
            if (result.id > 0 && result.status==9) {
                var cookies = new Cookies(req,res);
                var cryptoMobile = Crypto.encrypt(result.mobile);
                cookies.set("mobile",cryptoMobile,1);
                // res.cookie("mobile", result.mobile);
                res.redirect("/apartment/list");
                return;
            }
        }
        var failure = new IndexModel();
        failure.message="提示：用户和密码错误！";
        res.render('index', failure);
    });


}