var express = require('express');
var router = express.Router();

router.get('/dashboard', function (req, res, next) {


  // replace with middleware
  if (!req.user) {
    res.redirect('/user/login');
  }
  // console.log(res.cookie());
  // render the page and pass in any flash data if it exists
  res.render('dashboard', {
    user: req.user // get the user out of session and pass to template
  });

});

module.exports = router;

