const mongoose = require("mongoose");
const Schema = mongoose.Schema;


// Create Schema and Model
const PostSchema = new Schema({
  postTitle: String,
  created: { type: Date, default: Date.now },
  modified: { type: Date, default: Date.now },
  imageId: String,
  imageUrl: String,
  description: String,
  views: Number,
  hearts: Number
});


// Create Model
const Post = mongoose.model('posts', PostSchema);

module.exports = Post;