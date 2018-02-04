var express = require('express');
var app = require('../server.js');

var UserController = require('../controllers/usercontroller.js')

function isLoggedIn(req, res, next) {
 
    if (req.isAuthenticated())
     
        return next();
         
    res.redirect('/signin');
 
}

function isLoggedOut(req, res, next) {
 
    if (!req.isAuthenticated())
     
        return next();
         
    res.redirect('/');
 
}


app.get('/', function (req, res) {
  res.send('hello world')
})




// User routes

app.get('/user/register', isLoggedOut, UserController.register);

app.post('/user/register', isLoggedOut, UserController.create);

app.get('/user/login', isLoggedOut, UserController.login);
app.post('/user/login', isLoggedOut, UserController.authenticate);

app.get('/user/logout', UserController.logout);