var mongoose = require('mongoose')
var express = require('express')
var bodyParser = require("body-parser")

//Naziv baze
var mongoDB = "mongodb://localhost:27017/JobHunter";

// Unutar baza bi imamo kolekcije: student, companija...
mongoose.connect(mongoDB, {useNewUrlParser: true, useUnifiedTopology: true}, function(err, response){
  if (err){
    console.log("Error in connection");
  }else{

    console.log("Connected! ");
  }
});

var app = express();

app.use(function (req, res, next) {
  res.setHeader('Access-Control-Allow-Origin', 'http:/localhost4200');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
  res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With');
  res.setHeader('Content-Type', 'text/plain');
  res.setHeader('Access-Control-Allow-Credentials', true);
  res.end(JSON.stringify(req.body, null, 2))
});


