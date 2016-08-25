'use strict';
var request = require("request");
var IndexModel = require('../models/index');

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
