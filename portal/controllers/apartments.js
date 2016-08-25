'use strict';

var request = require("request");
var apartmentHelper = require('../helper/apartment');

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

            result.pages = apartmentHelper.calculatePages(result.page ,result.endPage);
            result.apartments.forEach(function(apt){
                apt.stars=apartmentHelper.calculateStar(apt.rank);
            })
            logger.info(result);
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
