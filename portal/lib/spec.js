/**
 * Created by Administrator on 2016/8/29.
 */
'use strict';

var express = require('express'),
    passport = require('passport'),
    auth = require('../lib/auth'),
    UserModel = require('../models/user');

module.exports = function spec(app) {
    app.on('middleware:after:session', function configPassport(eventargs) {
        //Tell passport to use our newly created local strategy for authentication
        passport.use(auth.localStrategy());
        //Give passport a way to serialize and deserialize a user. In this case, by the user's id.
        passport.serializeUser(function(user, done) {
            done(null, user.id);
        });
        passport.deserializeUser(function(id, done) {

            var user = new UserModel();
            user.id=id;
            user.name="老魏";
            done(null, user);
        });

        app.use(passport.initialize());
        app.use(passport.session());
    });
    return {
        onconfig: function (config, next) {
            /*
             * Add any additional config setup or overrides here. `config` is an initialized
             * `confit` (https://github.com/krakenjs/confit/) configuration object.
             */
            next(null, config);
        }
    };

};