var express = require('express');
var path = require('path');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var passport = require('passport');
var setupPassport = require('./src/setupPassport');
var session = require('express-session');
var publicRoutes = require('./src/routes/publicRoutes.js');
var privateRoutes = require('./src/routes/privateRoutes.js');
var authenticationRoutes = require('./src/routes/authenticationRoutes');

// Move to helper function file later*****
var allowCrossDomain = function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Methods", "GET,PUT,POST,DELETE");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
};


var app = express();


// view engine setup
app.set('views', path.join(__dirname, 'src', 'views'));
app.set('view engine', 'jade');



app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());

// Static File Server Middleware
app.use('/public', express.static(path.join(__dirname, 'public')));
app.use('/slick', express.static(path.join(__dirname, 'slick')));

// Allow CORS
app.use(allowCrossDomain);

// Sessions Setup
app.use(session({
  secret: "kdafjkldsjfkljieur3892483728$%$@",
  resave: true,
  saveUninitialized: true
}));

// passport setup
setupPassport();
app.use(passport.initialize());
app.use(passport.session());


// Current User
app.use(function(req, res, next) {
  res.locals.currentUser = req.user;
  // res.locals.errors = req.flash('error');
  // res.locals.infos = req.flash('info');
  // res.locals.successes = req.flash('success');
  next();

});

// App Routes
app.use(publicRoutes);
app.use(privateRoutes);
app.use(authenticationRoutes);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.send('error');
});

module.exports = app;