var express = require('express');
var passport = require('passport');

var router = express.Router();

router.get('/login', function (req, res, next) {

  // render the page and pass in any flash data if it exists
  res.render('login', { message: req.flash('loginMessage') });

});

// process the login form
router.post('/login', passport.authenticate('local-login', {
  successRedirect: '/dashboard', // redirect to the secure profile section
  failureRedirect: '/login', // redirect back to the signup page if there is an error
  failureFlash: true // allow flash messages
}));



module.exports = router;

