var User = require('./../models/user'),
  mongoose = require('mongoose'),
  db = require('./db');

mongoose.connect(db.dbUrl);

var nodemailer = require('nodemailer');

var Promise = require('bluebird');

const transport = nodemailer.createTransport({
  service: 'Gmail',
  secure: false,
  port: 25,
  auth: {
    user: 'teamdream598@gmail.com',
    pass: 'secretpass',
  },
  tls: {
    rejectUnauthorized: false
  }
});


module.exports = function sendEmail(to, subject, message) {
  const mailOptions = {
    from: 'teamdream598@gmail.com',
    to,
    subject,
    text: message,
  };
  transport.sendMail(mailOptions, (error) => {
    if (error) {
      console.log(error);
    } else {
      console.log(mailOptions)
    }
  });
};
