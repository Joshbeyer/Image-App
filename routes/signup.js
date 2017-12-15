var express = require('express');
var passport = require('passport');


var router = express.Router();
var sendemail = require('./../utils/verifyemail');

router.get('/signup', function (req, res, next) {

  // render the page and pass in any flash data if it exists
  res.render('signup', { message: req.flash('signupMessage') });
});

// process the signup form
router.post('/signup', passport.authenticate('local-signup'), {
  failureRedirect: '/user/signup', // redirect back to the signup page if there is an error
  failureFlash: true, // allow flash messages
  passReqToCallback: true // allows us to pass back the entire request to the callback
}), function (req, res) {

  res.redirect('/user/dashboard'); // redirect to the secure profile section

  // 1) -  query db for a user with the matching email
  // 2) - if user found, send the email vertification link
  // 3) - if no user then something went wrong and we wouldn't normally get here anyway but send some json back to say things went wrong sending email
});



var sendemail = require('./../utils/verifyemail');
// process the signup form
router.post('/signup', passport.authenticate('local-signup'), {
  failureRedirect: '/user/signup', // redirect back to the signup page if there is an error
  failureFlash: true, // allow flash messages
  passReqToCallback: true // allows us to pass back the entire request to the callback
}), function (req, res) {
  // Here I want to call the method sendEmail(args);
  sendemail.sendEmail('mydevaccs@gmail.com', 'test subject', 'test message.');
  console.log('sent email');
  console.log(sendemail.sendEmail().message);
  // res.redirect('/user/dashboard'); // redirect to the secure profile section
};


module.exports = router;

