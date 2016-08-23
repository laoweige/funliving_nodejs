'use strict';

var request = require("request");
var IndexModel = require('../models/index');
//var dust = require('dustjs-linkedin')
//require('dustjs-helpers')


exports.search =  function (req, res){
    //console.log(dust.helpers);
    var uri = appSettings.api+"/search?city=";
    uri+=req.query.city;

    if( req.query.college &&  req.query.college!=""){
        uri+="&college=";
        uri+=req.query.college;
    }
    if( req.query.rent &&  req.query.rent!=""){
        uri+="&rent=";
        uri+=req.query.rent;
    }
    if( req.query.pageSize &&  req.query.pageSize!=""){
        uri+="&pageSize=";
        uri+=req.query.pageSize;
    }
    if( req.query.page &&  req.query.page!=""){
        uri+="&page=";
        uri+=req.query.page;
    }

    console.log(uri);
    request(uri, function (error, response, body) {
        if (!error && response.statusCode == 200) {
            var result = JSON.parse(body);
            result.pages = new Array();
            var start = 1;
            if(result.page>6){
                start=result.page-5;
            }
            console.log("start="+start)
            var j=0;
            for (var i = start; i <= result.endPage; i++) {
                if(j>=10) break;
                result.pages[j++]=i;
            }
            res.render('apartments', result);
        }
    });
}

exports.detail =  function (req, res){
    var model = new IndexModel();
    console.log("req.params.id="+req.params.id);
    var uri = appSettings.api+"/apartment/"+req.params.id;
    request(uri, function (error, response, body) {
        if (!error && response.statusCode == 200) {
            var result = JSON.parse(body);
            res.render('apartment', result);
        }
    });


}
