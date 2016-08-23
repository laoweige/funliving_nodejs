'use strict';

var IndexModel = require('../models/index');

exports.index = function (req, res){
    var model = new IndexModel();
    res.render('index', model);
}
