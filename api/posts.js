var express = require('express');
var router = express.Router();
var postsController = require('../controllers/').postsController;

// get posts or get certain posts
router.get('/posts',function(req, res){

})

// create post
router.post('/posts', function(req, res){
     var postContent = req.body;
    postsController.create(postContent)
    .then(function(post){
        res.json({
            confirmation : 'success',
            message : 'got some posts',
            data : post
        })
    })
    .catch(function(err){
        res.json({
            confirmation : 'fail',
            message : 'looks like we got an error',
            err : err
        })
    })
})

// get specific post
router.get('/posts/:post_id', function(req, res){

});

// update post
router.put('/posts/:post_id', function(req, res){

});

router.delete('/posts/:post_id', function(req, res){

});


module.exports = router;