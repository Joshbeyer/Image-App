var express = require('express');
var router = express.Router();

var homeRoutes = require('./home');
var userRoutes = require('./user');

var api = require('../api');


// Auth Testing
var loginRoutes = require('./login');
var signupRoutes = require('./signup');
var dashboardRoute = require('./dashboard');
var logoutRoute = require('./logout');

// Auth Testing
router.use(loginRoutes);
router.use(signupRoutes);
router.use(dashboardRoute);
router.use(logoutRoute);




router.use(homeRoutes);
router.use('/user', userRoutes);
router.use('/api', api);

module.exports = router;
