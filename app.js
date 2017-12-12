// import { request } from 'http';  //Had to comment this out because it causes an error and idk what it is exactly

var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');

var app = express();
var routes = require('./routes');


// Requirements for User Auth;
var passport = require('passport');
var flash = require('connect-flash');
var morgan = require('morgan');
var session = require('express-session');
var configDB = require('./utils/db')
var mongoose = require('mongoose');

// Configuration ================
mongoose.connect(configDB.url);

require('./utils/passport')(passport); // pass passport for configuration

// setup
app.use(morgan('dev'));

// required for passport
app.use(session({ secret: 'plsnofindme' }));
app.use(passport.initialize());
app.use(passport.session()); // persistant login sessions
app.use(flash()); // use connect-flash for flash messages stored in session

// END AUTH stuff ===========


// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

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
