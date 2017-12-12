var mongoose = require("mongoose");
var Schema = mongoose.Schema;


// Create Schema and Model
var PostSchema = new Schema({
  postTitle: String,
  created: { type: Date, default: Date.now },
  modified: { type: Date, default: Date.now },
  imageId: String,
  imageUrl: String,
  description: String,
  views: Number,
  hearts: Number
},{ collection : 'posts'});


// Create Model
var Post = mongoose.model('posts', PostSchema);

module.exports = Post;