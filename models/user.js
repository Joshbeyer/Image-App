// app/models/user.js
// load the things we need
var mongoose = require('mongoose');
var bcrypt = require('bcrypt-nodejs');

// define the schema for our user model
var userSchema = mongoose.Schema({
  firstName: String,
  lastName: String,
  roles: [{ type: 'String' }],
  joinedDate: { type: Date, default: Date.now },
  bio: String,
  email: String,
  password: String,
  passwordResetToken: String,
  passwordResetExpires: Date,
  active: { type: Boolean, default: false },
  verificationToken: String,

});

// methods ======================
// generating a hash
userSchema.methods.generateHash = function (password) {
  return bcrypt.hashSync(password, bcrypt.genSaltSync(8), null);
};

// checking if password is valid
userSchema.methods.validPassword = function (password) {
  return bcrypt.compareSync(password, this.password);
};

// create the model for users and expose it to our app
module.exports = mongoose.model('User', userSchema);


