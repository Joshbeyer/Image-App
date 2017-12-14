var mongoose = require('mongoose');

// Local modules
var Post = require('../models/post');


var dbUrl = 'mongodb://josh:josh@ds163020.mlab.com:63020/imgup';
mongoose.connect(dbUrl, function (err, res) {
  if (err) {
    console.log('DB Connection failed : ' + err)
  } else {
    console.log('DB Connection success ' + dbUrl);
  }
});
module.exports = {
  mongoose,
  dbUrl
}

// export a connection object
// module.exports = db;



// use .env file for credentials to the database, you'll need to use an env reader

