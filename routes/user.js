var express = require('express');
var router = express.Router();
var userController = require('../controllers').userController;
var User = require('./../models/user');
var randToken = require('rand-token');

router.all('/', function (req, res) {
    res.redirect('/user/dashboard');
});



/*    /user/dashboard  */
router.get('/dashboard', function (req, res, next) {
    if (!req.user) { res.redirect('/user/login'); }
    // render the page and pass in any flash data if it exists
    res.render('dashboard', {
        user: req.user // get the user out of session and pass to template
    });
});



/*    /user/logout  */
router.get('/logout', function (req, res) {
    req.logout();
    res.redirect('/');
});



/*    /user/login  */
router.get('/login', function (req, res, next) {
    res.render('login', { message: req.flash('loginMessage') });
});

router.post('/login', userController.login(), function (req, res, next) {
});



/*    /user/signup  */
router.get('/signup', function (req, res, next) {
    res.render('signup', { message: req.flash('signupMessage') });
});

router.post('/signup', userController.register(), function (req, res) {
    res.render('verifyemail'); // redirect to the secure profile section
});



/*  /users/verify   */
router.get('/verify', function (req, res) {
    var token = req.query.id;
    User.findOne({ 'verificationToken': token }, function (err, user) {
        if (user.verificationToken == token) {
            console.log('that token is correct! Verify the user');
            User.findOneAndUpdate({ 'verificationToken': token }, { 'active': true, verificationToken: '' }, function (err, resp) {
                console.log('The user has been verified!');
            });
        } else { console.log('The token is wrong! Reject the user. token should be: ' + user.verificationToken); }
    });
    res.render('emailverified');
});



module.exports = router;






