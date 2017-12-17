// utils/passport.js
var randToken = require('rand-token');
// load all the things we need
var LocalStrategy = require('passport-local').Strategy;
var userController = require('../controllers').userController;

var User = require('../models/user');


// expose this function to our app using module.exports
module.exports = function (passport) {

  // used to serialize the user for the session
  passport.serializeUser(function (user, done) {
    done(null, user.id);
  });

  // used to deserialize the user
  passport.deserializeUser(function (id, done) {
      userController.findUserById(id)
      .then(function(user){
          done(null, user);
      })
      .catch(function(err){
         done(err, null);
      })
  });

  // local sign up strategy
  passport.use('local-signup', new LocalStrategy({
    usernameField: 'email',
    passwordField: 'password',
    passReqToCallback: true // allows us to pass back the entire request to the callback
  },
  function (req, email, password, done) {

      process.nextTick(function(){

          userController.findUserByEmail(email)
          .then(function(user){
              if(user){
                  return done(null, false, req.flash('signupMessage', 'That email is already taken.'));
              } 

              var newUser = new User();
              newUser.email = email;
              newUser.firstName = '';
              newUser.lastName = '';
              newUser.bio = '';
              newUser.joinedDate = new Date();
              newUser.password = newUser.generateHash(password);
              verifyToken = randToken.generate(26);
              newUser.verificationToken = verifyToken;
              newUser.active = false;

              return newUser.save(function(err){
                if (err) {
                  throw err;
                } else {
                  userController.sendUserVerificationEmail(newUser)
                }
              })
          })
          .then(function(user){
              return done(null, user);
          })
          .catch(function(err){
              if (err){
                return done(err);
              }
          })
  
      });

  }));


  // local login strategy
  passport.use('local-login', new LocalStrategy({
    // by default, local strategy uses username and password, we will override with email
    usernameField: 'email',
    passwordField: 'password',
    passReqToCallback: true // allows us to pass back the entire request to the callback
  },
  function (req, email, password, done) { 

      userController.findUserByEmail(email)
      .then(function(user){

          if (!user){
            return done(null, false, req.flash('loginMessage', 'No user found.')); 
          }
      
          if (!user.validPassword(password)){
            return done(null, false, req.flash('loginMessage', 'Oops! Wrong password.')); 
          }

          if (!user.active){
            return done(null, false, req.flash('loginMessage', 'Please confirm your email to activate your account.'));
          }

          return done(null, user);
      })
      .catch(function(err){
          if(err){
            return done(err);
          }
      })


  }
  ));


};
