// utils/passport.js

// load all the things we need
var LocalStrategy = require('passport-local').Strategy;

// load up the user model
var User = require('./../models/user');

// expose this function to our app using module.exports



User.findOne({ 'local.email': email }, function (err, user) {
  // if there are any errors, return the error before anything else
  if (err)
    return done(err);

  // if no user is found, return the message
  if (!user)
    return done(null, false, req.flash('loginMessage', 'No user found.')); // req.flash is the way to set flashdata using connect-flash

  // if the user is found but the password is wrong
  if (!user.validPassword(password))
    return done(null, false, req.flash('loginMessage', 'Oops! Wrong password.')); // create the loginMessage and save it to session as flashdata

  if (!user.isVerified)
    return done(null, false, req.flash('loginMessage', 'Please confirm your email.'));
  // all is well, return successful user
  return done(null, user);
});




};
