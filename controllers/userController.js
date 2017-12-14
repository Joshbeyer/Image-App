var Promise = require('bluebird');
var User = require('../models/user');

var passport = require('passport');

module.exports = {
    
    login : function(params){
        return passport.authenticate('local-login', {
            successRedirect: '/user/dashboard', // redirect to the secure profile section
            failureRedirect: '/user/login', // redirect back to the signup page if there is an error
            failureFlash: true // allow flash messages
        })
    },

    register : function(params){
        return passport.authenticate('local-signup', {
            failureRedirect: '/user/signup', // redirect back to the signup page if there is an error
            failureFlash: true, // allow flash messages
            passReqToCallback: true // allows us to pass back the entire request to the callback
        });
    },

    getUserById : function(params){
        // query db for user with ID, remember to filter out password and other sensitive.
    },

    getUserByEmail : function(params){
        // query db for user with EMAIL, remember to filter out passwword and other sensititve
    }
    

}
