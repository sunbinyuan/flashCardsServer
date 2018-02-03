const express = require('express')
const app = module.exports = express()
const bodyParser = require('body-parser');
const Sequelize = require('sequelize');
var logger = require('morgan');
var cookieSession = require('cookie-session')
var cookieParser = require('cookie-parser');
var path = require('path');

const sequelize = app.sequelize = require('./configs/db.js');

sequelize
  .authenticate()
  .then(() => {
    console.log('Connection has been established successfully.');
  })
  .catch(err => {
    console.error('Unable to connect to the database:', err);
  });

//load models


app.set('view engine', 'ejs');
app.use(express.static('public'));

app.use(logger('dev'));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json())
app.use(cookieSession({
  name: 'session',
  keys: ['TOTALLY', 'NOT', 'SECRET'],

  // Cookie Options
  maxAge: 24 * 60 * 60 * 1000 * 2 // 2 days
}))
app.use(cookieParser(['TOTALLY', 'NOT', 'SECRET']));
app.use(express.static(path.join(__dirname, 'public')));

// load routes
require("./routes");


// load models
require("./models/index.js");


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

app.listen(3000, function () {
  console.log('Example app listening on port 3000!')
})

// sync() will create all table if they doesn't exist in database
sequelize.sync().then(function () {
  console.log("Database successfully migrated")
  // handler
})
.catch( function() {
  // handler
});

//parse form field from html body
/*app.post('/', function (req, res) {
  res.render('index');
  console.log(req.body.city);
})*/

module.exports = app;

