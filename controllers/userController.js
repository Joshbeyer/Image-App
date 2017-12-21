var Promise = require('bluebird');
var User = require('../models/user');

var passport = require('passport');


var mailer = require('../utils/email');
var randToken = require('rand-token');



module.exports = {

    login: function (params) {
        return passport.authenticate('local-login', {
            successRedirect: '/user/dashboard', // redirect to the secure profile section
            failureRedirect: '/user/login', // redirect back to the signup page if there is an error
            failureFlash: true // allow flash messages
        })
    },

    register: function (params) {
        return passport.authenticate('local-signup', {
            failureRedirect: '/user/signup', // redirect back to the signup page if there is an error
            failureFlash: true, // allow flash messages
            passReqToCallback: true // allows us to pass back the entire request to the callback
        });
    },

    findUserById: function (id) {
        return new Promise(function (resolve, reject) {
            User.findById(id, function (err, user) {
                if (err) {
                    reeject(err)
                } else {
                    resolve(user);
                }
            });
        });
    },

    findUserByEmail: function (email) {
        return new Promise(function (resolve, reject) {
            User.findOne({
                'email': email
            }, function (err, user) {
                if (err) {
                    reject(err)
                } else {
                    resolve(user);
                }
            });
        })
    },

    verifyEmail: function (tokenId) {
        return new Promise(function (resolve, reject) {

            User.findOneAndUpdate({
                    'verificationToken': tokenId
                }, {
                    'active': true,
                    verificationToken: ''
                },
                function (err, resp) {
                    if (err) {
                        reject(err)
                    }
                    resolve(resp);
                });
        })
    },

    sendUserVerificationEmail: function (user) {
        return new Promise(function (resolve, reject) {

            mailer.sendVerification(
                user.email,
                'Please verify email',
                'http://localhost:3000/user/verify?id=' + user.verificationToken,
                function (err, info) {
                    if (err) {
                        reject(err)
                    } else {
                        if (info) {
                            resolve(user);
                        }
                    }
                }
            );
        })
    },


    sendResetPassEmail: function (email) {
        return new Promise(function (resolve, reject) {
            var token = randToken.generate(26);
            User.findOneAndUpdate({
                    'email': email
                }, {
                    'verificationToken': token
                },
                function (err, resp) {
                    if (err) {
                        reject(err)
                    }
                    resolve(resp);
                })
            // Need to add Flash message here('Please check your email')
            return mailer.sendVerification(
                    email,
                    'Requested Password Reset',
                    'http://localhost:3000/user/reset/' + token),
                function (req, res) {};
        })
    },


    resetPassword: function (req, res, token, password) {
        User.findOne({
            verificationToken: token
        }, function (err, user) {
            if (!user) {
                // .flash needs added
                // req.flash('error', 'Password reset token is invalid or has expired.');
                console.log('no user found for reset');
                return res.redirect('back');
            }

            user.password = password;
            user.verificationToken = '';

            user.save(function (err) {
                req.login(user, function (err) {
                    if (err) {
                        throw err;
                        return
                    }
                    return res.redirect('/user/dashboard');
                })
            })
        })
    }

}