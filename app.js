const express = require('express');
const path = require('path');
const favicon = require('serve-favicon');
const logger = require('morgan');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');

const app = express();

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());

// REST API
app.use('/api/news', require('./server/news'));

if (process.env.NODE_ENV !== 'production') {

    // Webpack server configuration
    const webpackConfig = require('./webpack.config.js');

    const compiler = require('webpack')(webpackConfig);
    const middleware = require('webpack-dev-middleware')(compiler, {
        noInfo: true,
        publicPath: webpackConfig.output.publicPath
    });

    app.use(middleware);

    app.use(require('webpack-hot-middleware')(compiler));

    app.get('*', (req, res) => {
        res.write(middleware.fileSystem.readFileSync(path.join(__dirname, 'client/index.html')));
        res.end();
    });

} else {
    app.use(express.static(path.join(__dirname, 'client')));
}

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  const err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handlers

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
  app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    res.send({
      message: err.message,
      error: err
    });
  });
}

// production error handler
// no stacktraces leaked to user
app.use(function(err, req, res, next) {
  res.status(err.status || 500);
  res.send({
    message: err.message,
    error: {}
  });
});


module.exports = app;
