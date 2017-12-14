var express = require('express');
var router = express.Router();

var postsController = require('../controllers').postsController


router.get('/', function (req, res, next) {
      

      postsController.find()
      .then(function(posts){
      		res.render('index', {posts : posts});
      })
      .catch(function(err){
      		res.render('index', {posts : []});
      })
});



module.exports = router;