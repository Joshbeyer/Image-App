// load the things we need
var mongoose = require('mongoose');


const tokenSchema = new mongoose.Schema({
  _userId: { type: mongoose.Schema.Types.ObjectId, required: true, ref: 'User' },
  token: { type: String, required: true },
  createdAt: { type: Date, required: true, default: Date.now, expires: 43200 }
  // add expiration
});


// create the model for users and expose it to our app
module.exports = mongoose.model('Token', tokenSchema);

