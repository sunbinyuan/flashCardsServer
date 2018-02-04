var express = require('express');
var app = require('../server.js');

var UserController = require('../controllers/usercontroller.js');
var SubjectController = require('../controllers/subjectcontroller.js');
var FlashCardController = require('../controllers/flashcardcontroller.js');

function isLoggedIn(req, res, next) {
 
    if (req.isAuthenticated())
     
        return next();
         
    res.redirect('/user/login');
 
}

function isLoggedOut(req, res, next) {
 
    if (!req.isAuthenticated())
     
        return next();
         
    res.redirect('/');
 
}


app.get('/', function (req, res) {
  res.render('index');
})



// Flashcard routes
app.get('/api/flashcards', FlashCardController.all_json);
app.post('/subject/:subjectId/flashcard', isLoggedIn, FlashCardController.create);
app.get('/subject/:subjectId/flashcard/new', isLoggedIn, FlashCardController.new);
app.get('/subject/:subjectId/flashcard/:flashcardId/destroy', isLoggedIn, FlashCardController.destroy);

app.get('/flashcard', isLoggedIn, FlashCardController.all);

// Subject routes
app.get('/subject', isLoggedIn, SubjectController.index);
app.get('/subject/new', isLoggedIn, SubjectController.new);
app.get('/subject/:subjectId', isLoggedIn, FlashCardController.index);
app.get('/subject/:subjectId/destroy', isLoggedIn, SubjectController.destroy);
app.post('/subject', isLoggedIn, SubjectController.create);

// User routes

app.get('/user/register', isLoggedOut, UserController.register);

app.post('/user/register', isLoggedOut, UserController.create);

app.get('/user/login', isLoggedOut, UserController.login);
app.post('/user/login', isLoggedOut, UserController.authenticate);

app.get('/user/logout', UserController.logout);