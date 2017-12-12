var express = require('express');
var router = express.Router();

router.get('/dashboard', function (req, res, next) {

  // render the page and pass in any flash data if it exists
  res.render('dashboard', {
    user: req.user // get the user out of session and pass to template
  });

});

module.exports = router;

