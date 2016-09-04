'use strict';

var request = require("request");
var apartmentHelper = require('../helper/apartment');

exports.search =  function (req, res){
    if(req.cookies["user"]) {
        console.log("req.cookies[user].name=" + req.cookies["user"].name);
    }

    var uri = appSettings.api+"/search?city=";
    uri+=req.query.city;

    if( req.query.college &&  req.query.college!=""){
        uri+="&college=";
        uri+=req.query.college;
    }
    var rents = ["0","90000"];
    if(req.query.rent1){
        rents[0]=req.query.rent1;
    }
    if(req.query.rent2){
        rents[1]=req.query.rent2;
    }
    if(rents[0]!="0" || rents[1]!="90000"){
        uri+="&rent=";
        uri+=rents.join(",");
    }
    if( req.query.pageSize &&  req.query.pageSize!=""){
        uri+="&pageSize=";
        uri+=req.query.pageSize;
    }
    if( req.query.page &&  req.query.page!=""){
        uri+="&page=";
        uri+=req.query.page;
    }
    if( req.query.sort &&  req.query.sort!=""){
        uri+="&sort=";
        uri+=req.query.sort;
    }


    console.log(uri);
    request(uri, function (error, response, body) {
        if (!error && response.statusCode == 200) {
            var result = JSON.parse(body);

            result.pages = apartmentHelper.calculatePages(result.page ,result.endPage);
            result.apartments.forEach(function(apt){
                apt.stars=apartmentHelper.calculateStar(apt.rank);
            })
            result.rents=[rents[0],rents[1]];
            result.sort=req.query.sort;
            // logger.info(result);
            res.render('apartments', result);
        }
    });
}

exports.detail =  function (req, res){

    var uri = appSettings.api+"/apartment/"+req.params.id;
    if( req.query.college &&  req.query.college!=""){
        uri+="?college=";
        uri+=req.query.college;
    }
    request(uri, function (error, response, body) {
        if (!error && response.statusCode == 200) {
            var result = JSON.parse(body);
            result.stars = apartmentHelper.calculateStar(result.rank);
            res.render('apartment', result);
        }
    });


}
