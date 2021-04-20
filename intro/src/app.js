const express = require('express');
const usersRouter = require('./routes/api/users');
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

app.use('/api/users', usersRouter);

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