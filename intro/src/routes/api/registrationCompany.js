const express = require('express');
const app = require('../../app');
const controller = require('../../controllers/registrationCompany');
const verifyToken = require('./../../utils/authentication');

const router = express.Router();

router.post('/', controller.addNewCompany);

module.exports = router;
