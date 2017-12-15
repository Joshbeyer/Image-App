var express = require('express');
var router = express.Router();
var postsController = require('../controllers/').postsController;

// get posts or get certain posts
router.get('/posts',function(req, res){


    // var search = JSON.parse(req.query.search) || null;
    var limit = req.query.limit || null;
    var page = req.query.page || null; 
    if(req.query.search){
       var search = {
            postTitle : {
                '$regex' : JSON.parse(req.query.search).postTitle
            }
        }     
    } else {
        var search = null;
    }
    

    console.log(search);

    postsController.find(search, limit, page)
      .then(function(posts){
            res.json({posts : posts});
      })
      .catch(function(err){
            res.json({posts : []})
      })
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
    var post_id = req.params.post_id;

    if(!post_id){
        res.json({
            confirmation : 'fail',
            message : 'no post_id param supplied',
            data : null
        })
        return;
    }

    postsController.findById(post_id)
    .then(function(post){
        res.json({
            confirmation : 'success',
            message : 'post id matches',
            data : post
        })
    })
    .catch(function(err){
        res.json({
            confirmation : 'fail',
            message : 'no post with this id matches',
            data : err
        })
    })
    
});

// update post
router.put('/posts/:post_id', function(req, res){
    var post_id = req.params.post_id;

    var data = req.body

    if(!post_id){
        res.json({
            confirmation : 'fail',
            message : 'no post_id param supplied',
            data : null
        })
        return;
    }

    if(!data){
        res.json({
            confirmation : 'fail',
            message : 'no update data supplied',
            data : null
        })
        return;
    }

    postsController.update(post_id, data)
    .then(function(modifiedPost){
        res.json({
            confirmation : 'success',
            message : 'post updated',
            data : modifiedPost
        })
    })
    .catch(function(err){
        res.json({
            confirmation : 'fail',
            message : 'no post with this id matches or invalid update properties',
            data : err
        })
    })
});

router.delete('/posts/:post_id', function(req, res){

});


module.exports = router;