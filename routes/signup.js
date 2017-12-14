var express = require('express');
var passport = require('passport');


var router = express.Router();

router.get('/signup', function (req, res, next) {

  // render the page and pass in any flash data if it exists
  res.render('signup', { message: req.flash('signupMessage') });

});


// process the signup form
// router.post('/signup', passport.authenticate('local-signup', {
//   successRedirect: '/user/dashboard', // redirect to the secure profile section
//   failureRedirect: '/user/signup', // redirect back to the signup page if there is an error
//   failureFlash: true // allow flash messages
// }));

// process the signup form
router.post('/signup', passport.authenticate('local-signup', {
  failureRedirect: '/user/signup', // redirect back to the signup page if there is an error
  failureFlash: true, // allow flash messages
  passReqToCallback: true // allows us to pass back the entire request to the callback
}), function (req, res, email, passpord, done) {
  console.log(req.body);
  console.log(req.params);
  res.successRedirect('/user/dashboard'); // redirect to the secure profile section
});





module.exports = router;

