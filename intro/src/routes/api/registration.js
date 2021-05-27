const express = require('express');
const app = require('../../app');
const controller = require('../../controllers/registration');
const verifyToken = require('./../../utils/authentication');

const router = express.Router();

router.post('/', controller.addNewStudent);

module.exports = router;
