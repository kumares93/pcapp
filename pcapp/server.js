var createError = require('http-errors');
var express = require('express');
var path = require('path');
var http = require('http');
var logger = require('morgan');
var db = require('./src/db/mongoose');
// Configuring Passport
var passport = require('passport');
// Initialize Passport
var initPassport = require('./src/passport/init');
initPassport(passport);

var log = require('./src/utils/log')(module);

var apiRouter = require('./src/routes/api');
var courseRouter = require('./src/routes/course.routes');
var usersRouter = require('./src/routes/users.routes');
var authRouter = require('./src/routes/auth.routes')(passport);

var app = express();

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'dist/pioneercoders')));
app.set('port', process.env.PORT || 4300);
app.use(passport.initialize());
app.use(passport.session());

app.use('/', express.static(path.join(__dirname, 'dist/pioneercoders')));
app.use('/api', apiRouter);
app.use('/api', courseRouter);
app.use('/api', usersRouter);
app.use('/api', authRouter);
app.all('*', function (req, res){
  res.status(403).send('403 - Forbidden');
})

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.send(err.status);
});

http.createServer(app).listen(app.get('port'), function(){
  // console.log('Express server listening on port ' + app.get('port'));
  log.debug(`Express server listening on port ${app.get('port')} `);
});
