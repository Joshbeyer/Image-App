var express = require('express');
var router = express.Router();

var homeRoutes = require('./home');
var userRoutes = require('./user');

var api = require('../api');


router.use(homeRoutes);
router.use('/user', userRoutes);
router.use('/api', api);

module.exports = router;
