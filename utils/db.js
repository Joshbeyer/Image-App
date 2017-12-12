// require mongodb
// const mongoose = require("mongoose");

// Local modules
const Post = require('../models/post');

// Connect to db
// const db = mongoose.connect('mongodb://josh:josh@ds163020.mlab.com:63020/imgup');

// // Create Posting
// var posting = new Post({
//   postTitle: `Testing Title`,
//   description: `Testing Post`,
//   views: 0,
//   hearts: 0
// });

// // Save to db
// posting.save();


var mongoose = require('mongoose');


var dbUrl = 'mongodb://josh:josh@ds163020.mlab.com:63020/imgup';
mongoose.connect(dbUrl, function (err, res) {
  if (err) {
    console.log('DB Connection failed : ' + err)
  } else {
    console.log('DB Connection success ' + dbUrl);
  }
});
module.exports = mongoose;


// export a connection object
// module.exports = db;



// use .env file for credentials to the database, you'll need to use an env reader

