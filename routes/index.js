var express = require('express');
var router = express.Router();

var homeRoutes = require('./home');
var userRoutes = require('./user');

var api = require('../api');


// Auth Testing


// Auth Testing




router.use(homeRoutes); //            /
router.use('/user', userRoutes); //   /user/
router.use('/api', api); //           /api/

module.exports = router;
