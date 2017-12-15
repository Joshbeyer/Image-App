var express = require('express');
var router = express.Router();
var userController = require('../controllers').userController;


var mailer = require('./../utils/verifyemail');

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






var rand, mailOptions, host, link;

/*    /user/signup  */
router.get('/signup', function (req, res, next) {
    res.render('signup', { message: req.flash('signupMessage') });
});

router.post('/signup', userController.register(), function (req, res) {
    rand = Math.floor((Math.random() * 100) + 54);
    host = req.get('host');
    link = "http://" + host + "/user/verify?id=" + rand;
    mailer(req.body.email, 'test subject', link);
    console.log('sent email');
    // console.log(sendemail.sendEmail().message);
    res.redirect('/user/dashboard'); // redirect to the secure profile section
    // 1) -  query db for a user with the matching email
    // 2) - if user found, send the email vertification link
    // 3) - if no user then something went wrong and we wouldn't normally get here anyway but send some json back to say things went wrong sending email
});






/*    /user/verify  */
router.get('/verify', function (req, res) {
    console.log(req.protocol + ":/" + req.get('host'));
    if ((req.protocol + "://" + req.get('host')) == ("http://" + host)) {
        console.log("Domain is matched. Information is from Authentic email");
        if (req.query.id == rand) {
            console.log("email is verified");
            res.end("<h1>Email " + mailOptions.to + " is been Successfully verified");
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






