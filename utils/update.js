

var express = require('express');
var router = express.Router();
var userController = require('../controllers').userController;

var mongoose = require('mongoose');
var mailer = require('./../utils/verifyemail');
var db = require('./../utils/db');


var User = require('./../models/user');




// // If query IS passed into .find(), filters by the query parameters
// User.find({ "email": "mydevaccs@gmail.com" }, (err, userinfo) => {
//   if (err) {
//     console.log(err);
//   } else {
//     // send the list of all people in database with name of "John James" and age of 36
//     // Very possible this will be an array with just one Person object in it.
//     console.log(userinfo);
//   }

// });


// 000000000000000000000000000000000000000000000000000000000000000000000000



// This would likely be inside of a PUT request, since we're updating an existing document, hence the req.params.todoId.
// Find the existing resource by ID
User.findOne({ email: 'mydevaccs@gmail.com' }, function (err, user) {
  user.isVerified = true;
  // user.rights = newUser.rights;

  user.save(function (err) {
    if (err) {
      console.error('ERROR!');
    }
  });
});