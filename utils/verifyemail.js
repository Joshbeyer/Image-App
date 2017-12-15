var User = require('./../models/user'),
  mongoose = require('mongoose'),
  db = require('./db');

mongoose.connect(db.dbUrl);

var crypto = require('crypto');
var nodemailer = require('nodemailer');
var crypt = require('./crypt');

var encryptedPassword = '126891c03fef8f5fc1e1d8714d82bb';

const transport = nodemailer.createTransport({
  service: 'Gmail',
  secure: false,
  port: 25,
  auth: {
    user: 'teamdream598@gmail.com',
    pass: crypt.decrypt(encryptedPassword),
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