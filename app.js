var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var ejs_layout = require('ejs-layouts');
var csrf = require('csurf');

var app = express();
var routes = require('./routes');



// Requirements for User Auth;
var passport = require('passport');
var flash = require('connect-flash');
var morgan = require('morgan');
var session = require('express-session');
var configDB = require('./utils/db')
var mongoose = require('mongoose');



// database connection
mongoose.connect(configDB.url);
require('./utils/passport')(passport); // pass passport for configuration



// Auth
app.use(session({ 
  secret: 'plsnofindme',
  cookie : {
    httpOnly: true
  }
}));
app.use(passport.initialize());
app.use(passport.session()); // persistant login sessions
app.use(flash()); // use connect-flash for flash messages stored in session



// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');
app.use(ejs_layout.express);



// other middleware
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(morgan('dev'));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(csrf());

// use csrf token for all routes;
app.use(function(req, res, next) {
  res.locals._csrf = req.csrfToken();
  next();
});


// assign routes
app.use('/', routes);


// catch 404 and forward to error handler
app.use(function (req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});
// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
