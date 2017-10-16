var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');

<<<<<<< HEAD
var MongoClient = require("mongodb").MongoClient;
var index = require('./routes/index');
var users = require('./routes/users');
var tables = require('./routes/tables');
=======
var api = require('./routes/apiRest');
>>>>>>> 09566144ee87ef6b385e98d23b97adbb7f7a1557

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'twig');

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

<<<<<<< HEAD
app.use('/', index);
app.use('/users', users);
app.use('/tables', tables);

MongoClient.connect("mongodb://localhost/Blackjackdb", function(err, db) {
    if (err) throw err;
    console.log("Database created!");
    db.createCollection("users", function(err, res) {
      if (err) throw err;
      console.log("Collection Users created!");
      db.close();
    });
    db.createCollection("table", function(err, res) {
      if (err) throw err;
      console.log("Collection Table created!");
      db.close();
    });

});
=======
app.use('/api', api);
>>>>>>> 09566144ee87ef6b385e98d23b97adbb7f7a1557

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
  res.render('error');
});



module.exports = app;
