// app.js
var express = require('express'),
    logger = require('morgan'),
    dust = require('dustjs-helpers'),   // require dustjs-helpers
    less = require('less-middleware'),
    path = require('path')
    ;

var app = express(),
    router = express.Router();

var routes = require('./routes');

require('./src/dust/helpers');          // add your own helpers

var engines = require('consolidate');   // require consolidate
app.engine('dust', engines.dust);       // define dust as template engine

app.set('view engine', 'dust');
app.set('views', __dirname + '/views');
app.use(less(path.join(__dirname, 'public')));
app.use(express.static(__dirname + '/public', {
    redirect: false
}));

router.use(logger('combined'));
router.route('/')
    .all(function(req, res, next) {
        next();
    })
    .get(routes.index)
    ;

app.use('/', router);

// --------------------------------------------------------
// ERROR HANDLERS
app.use(function(req, res, next) {
    var err = new Error('Not Found');
    err.status = 404;
    next(err);
});
// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
    app.use(function(err, req, res, next) {
        res.render('error', {
            message: err.message,
            error: err
        });
    });
}

// production error handler
// no stacktraces leaked to user
app.use(function(err, req, res, next) {
    res.render('error', {
        message: err.message,
        error: {}
    });
});

module.exports = app;