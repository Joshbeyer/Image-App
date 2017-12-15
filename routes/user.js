var express = require('express');
var router = express.Router();
var userController = require('../controllers').userController;
var mailer = require('./../utils/verifyemail');
var db = require('./../utils/db');
var User = require('./../models/user');
var randToken = require('rand-token');

router.all('/', function (req, res) {
    res.redirect('/user/dashboard');
});



/*    /user/dashboard  */
router.get('/dashboard', function (req, res, next) {
    if (!req.user) {
        res.redirect('/user/login');
    }

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





var token, mailOptions, host, link;
var target;
/*    /user/signup  */
router.get('/signup', function (req, res, next) {
    res.render('signup', { message: req.flash('signupMessage') });
});

router.post('/signup', userController.register(), function (req, res) {
    token = randToken.generate(26);
    host = req.get('host');
    link = "http://" + host + "/user/verify?id=" + token;
    mailer(
        req.body.email,
        'Please confirm your email.',
        link);
    target = req.body.email;


    console.log('sent email');
    // console.log(sendemail.sendEmail().message);

    res.render('verifyemail'); // redirect to the secure profile section
});




/*    /user/verify  */
router.get('/verify', function (req, res) {
    console.log(req.protocol + ":/" + req.get('host'));
    if ((req.protocol + "://" + req.get('host')) == ("http://" + host)) {
        console.log("Domain is matched. Information is from Authentic email");
        if (req.query.id == token) {
            console.log("email is verified");
            // User.findOneAndUpdate({ email: target }, { isVerified: true });
            // Find the existing resource by ID
            User.findOne({ email: target }, function (err, user) {
                user.isVerified = true;
                // user.rights = newUser.rights;

                user.save(function (err) {
                    if (err) {
                        console.error('ERROR!');
                    }
                });
            });
            res.render('emailverified');
        }
        else {
            console.log("email is not verified");
            res.end("<h1>Bad Request</h1>");
        }
    }
    else {
        res.end("<h1>Request is from unknown source");
    }
});



module.exports = router;






