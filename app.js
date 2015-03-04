var express = require('express'),
    //path = require('path'),
    logger = require('morgan'),
    cookieParser = require('cookie-parser'),
    bodyParser = require('body-parser');

var routes = require('./routes/index'),
    users = require('./routes/users'),
    db = require('./db');

var app = express();

app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());

app.use('/', routes);
app.use('/users', users);

app.initDB = function (filename) {
    this.db = db(filename);
};

module.exports = app;
