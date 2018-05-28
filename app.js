var http     = require('http');
var express = require('express');
var path = require('path');
var favicons = require('connect-favicons');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');

var webRouter = require('./webRouter')

var app = express();
// 静态文件目录
var staticDir = path.join(__dirname, 'public');
// // view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs')

// uncomment after placing your favicon in /public
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());

// 静态资源
app.use(favicons(__dirname + '/public/img/icons'));
app.use('/public', express.static(staticDir));
app.use('/uploads',express.static(path.join(__dirname, 'uploads')));
app.use('/', webRouter);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handlers

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
  app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    res.render('error', {
      message: err.message,
      error: err
    });
  });
}

// production error handler
// no stacktraces leaked to user
app.use(function(err, req, res, next) {
  res.status(err.status || 500);
  res.render('error', {
    message: err.message,
    error: {}
  });
});

module.exports = app;
