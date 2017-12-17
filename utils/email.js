// utils/email.js
var nodemailer = require('nodemailer');

var User = require('./../models/user');

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

module.exports = {
  sendVerification(to, subject, message, cb) {
    const mailOptions = {
      to: to,
      subject: subject,
      text: message,
    };
    transport.sendMail(mailOptions, cb);
  }

}


