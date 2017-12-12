const mongoose = require("mongoose");
const Schema = mongoose.Schema;


// Create Schema and Model
const UserSchema = new Schema({
  username: String,
  email: String,
  password: String
  // Whatever else
});


// Create Model
const User = mongoose.model('posts', UserSchema);

module.exports = User;