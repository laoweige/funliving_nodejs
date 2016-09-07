'use strict';

var request = require("request");
var IndexModel = require('../models/index');
var Cookies = require('../helper/cookies');
var Crypto = require('../helper/crypto');

exports.login =  function (req, res){
    var result = new IndexModel();
    res.render('user/login', result);
}

exports.postLogin =  function (req, res){
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
                if (result.id > 0) {
                    var cookies = new Cookies(req,res);
                    cookies.set("mobile",Crypto.encrypt(result.mobile),1);
                    cookies.set("id",Crypto.encrypt(result.id+""),1);
                    // res.cookie("mobile", result.mobile);
                    res.redirect("/");
                    return;
                }
            }
            var failure = new IndexModel();
        failure.message="提示：用户和密码错误！";
            res.render('user/login', failure);
        });


}

exports.signup =  function (req, res){

    // var uri = appSettings.api+"/apartment/"+req.params.id;
    // if( req.query.college &&  req.query.college!=""){
    //     uri+="?college=";
    //     uri+=req.query.college;
    // }
    // request(uri, function (error, response, body) {
    //     if (!error && response.statusCode == 200) {
    //
    //         res.render('reg', result);
    //     }
    // });
    var result = new IndexModel();
    res.render('user/signup', result);
}
