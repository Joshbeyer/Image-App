var User = require('./app/userModel'),
  mongoose = require('mongoose'),
  nev = require('email-verification')(mongoose),
  db = require('./db');

mongoose.connect(db.dbUrl);


nev.configure({
  verificationURL: 'http://myawesomewebsite.com/email-verification/${URL}',
  persistentUserModel: User,
  tempUserCollection: 'myawesomewebsite_tempusers',

  transportOptions: {
    service: 'Gmail',
    auth: {
      user: 'teamdream598@gmail.com',
      pass: 'secretpass'
    }
  },
  verifyMailOptions: {
    from: 'Do Not Reply <myawesomeemail_do_not_reply@gmail.com>',
    subject: 'Please confirm account',
    html: 'Click the following link to confirm your account:</p><p>${URL}</p>',
    text: 'Please confirm your account by clicking the following link: ${URL}'
  }
}, function (error, options) {
});


// generating the model, pass the User model defined earlier 
nev.generateTempUserModel(User);

// using a predefined file 
var TempUser = require('./app/tempUserModel');
nev.configure({
  tempUserModel: TempUser
}, function (error, options) {
});



// get the credentials from request parameters or something 
var email = "...",
  password = "...";

var newUser = User({
  email: email,
  password: password
});

nev.createTempUser(newUser, function (err, existingPersistentUser, newTempUser) {
  // some sort of error 
  if (err)
    // handle error... 

    // user already exists in persistent collection... 
    if (existingPersistentUser)
      // handle user's existence... violently. 

      // a new user 
      if (newTempUser) {
        var URL = newTempUser[nev.options.URLFieldName];
        nev.sendVerificationEmail(email, URL, function (err, info) {
          if (err)
            // throw err
            console.log(err);

          // flash message of success 
        });

        // user already exists in temporary collection... 
      } else {
        // flash message of failure... 
      }
});

var url = '...';
nev.confirmTempUser(url, function (err, user) {
  if (err)
    // handle error... 

    // user was found! 
    if (user) {
      // optional 
      nev.sendConfirmationEmail(user['email_field_name'], function (err, info) {
        // redirect to their profile... 
      });
    }

    // user's data probably expired... 
    else
        // redirect to sign-up 
});