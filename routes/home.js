var express = require('express');
var router = express.Router();

var homeController = require('../controllers').homeController;

router.get('/', function(req, res, next) {
    
      homeController.get()
      .then(function(dara){
        res.send('heyy');
      })
      .catch(function(err){
        console.log(err);
      })
     
});

module.exports = router;