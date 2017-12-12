var Promise = require('bluebird');
var Posts = require('../models/post');


module.exports = {
    find : function(params){
        return new Promise(function(resolve, reject){
            Posts.find(params, function(err, posts){
                if(err){
                    reject(err);
                }
                else{
                    resolve(posts);
                }
            });
        });
    },
    findById : function(id){
        return new Promise(function(resolve, reject){
            Posts.findById(id, function(err, post){
                if(err){
                    reject(err);
                } else {
                    resolve(post);
                }
            })
        });
    },
    create : function(params){
        return new Promise(function(resolve, reject){
            Posts.create(params, function(err, post){
                if(err){
                    reject(err);
                } else {
                    resolve(post)
                }
            });
        })
    }
}
