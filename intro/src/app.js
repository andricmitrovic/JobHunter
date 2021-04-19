const express = require('express');
const usersRouter = require('./routes/api/users');
const { urlencoded, json } = require('body-parser');

const app = express();

app.use(json());
app.use(urlencoded({ extended: false }));

app.use('/api/users', usersRouter);

module.exports = app;
