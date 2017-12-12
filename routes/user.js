var express = require('express');
var router = express.Router();



var loginRoutes = require('./login');
var signupRoutes = require('./signup');
var dashboardRoute = require('./dashboard');
var logoutRoute = require('./logout');

router.all('/', function(req, res){
    res.redirect('/user/dashboard');
});
router.use(loginRoutes); //           /login
router.use(signupRoutes); //          /signup
router.use(dashboardRoute); //        /dashboard
router.use(logoutRoute); //           /logout

module.exports = router;
