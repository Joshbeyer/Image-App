var express = require('express');
var router = express.Router();
var userController = require('../controllers').userController;
var User = require('./../models/user');
var randToken = require('rand-token');

router.all('/', function (req, res) {
    res.redirect('/user/dashboard');
});



/*    /user/dashboard  */
router.get('/dashboard', function (req, res, next) {
    if (!req.user) {
        res.redirect('/user/login');
    }
    if (!req.user.active) {
        res.render('verifyemail');
        return;
    }
    // render the page and pass in any flash data if it exists
    res.render('dashboard', {
        user: req.user // get the user out of session and pass to template
    });
});



/*    /user/logout  */
router.get('/logout', function (req, res) {
    req.logout();
    res.redirect('/');
});



/*    /user/login  */
router.get('/login', function (req, res, next) {
    res.render('login', {
        message: req.flash('loginMessage')
    });
});

router.post('/login', userController.login(), function (req, res, next) {});



/*    /user/signup  */
router.get('/signup', function (req, res, next) {
    res.render('signup', {
        message: req.flash('signupMessage')
    });
});

router.post('/signup', userController.register(), function (req, res) {
    res.render('verifyemail'); // redirect to the secure profile section
});



/*    /user/signup  */
router.get('/signup', function (req, res, next) {
    res.render('signup', {
        message: req.flash('signupMessage')
    });
});

router.post('/signup', userController.register(), function (req, res) {
    res.render('verifyemail'); // redirect to the secure profile section
});



/*  /users/verify   */
router.get('/verify', function (req, res) {
    var token = req.query.id;

    userController.verifyEmail(token)
        .then(function (user) {
            if (user) {
                req.login(user, function (err) {
                    if (err) {
                        throw err;
                        return
                    }
                    return res.redirect('/user/dashboard');
                })
            } else {
                res.render('emailbadtoken');
            }
        })
        .catch(function (err) {
            res.render('emailbadtoken');
        })

});
router.get('/forgot', function (req, res) {
    res.render('forgot', {
        user: req.user
    });
});

router.post('/forgot', function (req, res, next) {
    userController.sendResetPassEmail(req.body.email);
});


router.get('/reset/:token', function (req, res) {
    User.findOne({
            verificationToken: req.params.token
        },
        function (err, user) {
            if (!user) {
                req.flash('error', 'Password reset token is invalid or has expired.');
                return res.redirect('/forgot');
            }
            res.render('reset', {
                user: req.user
            });
        });
});

router.post('/reset/:token', function (req, res, done) {
    console.log('User Token: ' + req.params.token + ' ' + 'User Password: ' + req.body.password);
    User.findOne({
        verificationToken: req.params.token
    }, function (err, user) {
        if (!user) {
            req.flash('error', 'Password reset token is invalid or has expired.');
            console.log('no user found for reset');
            return res.redirect('back');
        }

        user.password = req.body.password;
        user.verificationToken = '';

        user.save(function (err) {
            req.login(user, function (err) {
                if (err) {
                    throw err;
                    return
                }
                return res.redirect('/user/dashboard');
            })
        })
        // res.redirect('/user/login'), {message: req.flash('success', 'Success! Your password has been changed.')};
    })

});


module.exports = router;