var db = require('./db');
// require mongodb

// Local modules
var Post = require('../models/post');

// Create Posting
var posting = new Post({
  postTitle: `Testing Title`,
  description: `Testing Post`,
  views: 0,
  hearts: 0
});

// Save to db
posting.save();
