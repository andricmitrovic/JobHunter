const express = require('express');
const studentsRouter = require('./routes/api/students');
const companiesRouter = require('./routes/api/companies');
const { urlencoded, json } = require('body-parser');
const mongoose = require('mongoose');

const app = express();

const databaseString = "mongodb+srv://pzveb:pzveb@cluster0.r6adq.mongodb.net/JobHunter?retryWrites=true&w=majority";

mongoose.connect(databaseString, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
});
  
mongoose.connection.once('open', function () {
    console.log('Uspesno povezivanje!');

    mongoose.connection.db.listCollections().toArray(function (err, names) {
        console.log(names);
        module.exports.Collection = names;
    });
});

mongoose.connection.on('error', (error) => {
    console.log('Greska: ', error);
});
  

app.use(json());
app.use(urlencoded({ extended: false }));

app.use(function (req, res, next) {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization');
  
    if (req.method === 'OPTIONS') {
      res.header('Access-Control-Allow-Methods', 'OPTIONS, GET, POST, PATCH, PUT, DELETE');
  
      return res.status(200).json({});
    }
  
    next();
  });
  

app.use('/api/students', studentsRouter);
app.use('/api/companies', companiesRouter);

app.use(function (req, res, next) {
    const error = new Error('Zahtev nije podrzan!');
    error.status = 405;
  
    next(error);
  });
  
app.use(function (error, req, res, next) {
    const statusCode = error.status || 500;
    res.status(statusCode).json({
        error: {
        message: error.message,
        status: statusCode,
        stack: error.stack,
        },
    });
});
  
module.exports = app;