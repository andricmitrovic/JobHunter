const express = require('express');
const studentsRouter = require('./routes/api/students');
const companiesRouter = require('./routes/api/companies');
const profileRouter = require('./routes/api/profile');
const profileCompanyRouter = require('./routes/api/profileCompanies');
const registerRouter = require('./routes/api/registration');
const registerCompanyRouter = require('./routes/api/registrationCompany');
const changePasswordRouter = require('./routes/api/changePassword');
const changePasswordCompanyRouter = require('./routes/api/changePasswordCompany');

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
    res.setHeader("Access-Control-Allow-Origin", "*");
    res.setHeader("Access-Control-Allow-Credentials", "true");
    res.setHeader("Access-Control-Allow-Headers", "x-access-token", "Access-Control-Allow-Headers, Origin,Accept, X-Requested-With, Content-Type, Access-Control-Request-Method, Access-Control-Request-Headers");

    if (req.method === 'OPTIONS') {
      res.header('Access-Control-Allow-Methods', 'OPTIONS, GET, POST, PATCH, PUT, DELETE');

      return res.status(200).json({});
    }

    next();
  });

app.use('/api/students', studentsRouter);
app.use('/api/companies', companiesRouter);
app.use('/api/profile', profileRouter);
app.use('/api/profileCompanies', profileCompanyRouter);
app.use('/api/registration', registerRouter);
app.use('/api/registrationCompany', registerCompanyRouter);
app.use('/api/changePassword', changePasswordRouter);
app.use('/api/changePasswordCompany', changePasswordCompanyRouter);

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
