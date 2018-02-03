var express = require('express');
var app = require('../server.js');

app.get('/', function (req, res) {
  res.send('hello world')
})