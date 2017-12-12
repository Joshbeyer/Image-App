var express = require('express');
var passport = require('passport');


var router = express.Router();

router.get('/signup', function (req, res, next) {

  // render the page and pass in any flash data if it exists
  res.render('signup', { message: req.flash('signupMessage') });

});


// process the signup form
router.post('/signup', passport.authenticate('local-signup', {
  successRedirect: '/dashboard', // redirect to the secure profile section
  failureRedirect: '/signup', // redirect back to the signup page if there is an error
  failureFlash: true // allow flash messages
}));

module.exports = router;

