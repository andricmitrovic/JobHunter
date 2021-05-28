const express = require('express');
const app = require('../../app');
const controller = require('../../controllers/changePasswordCompany');
const verifyToken = require('./../../utils/authentication');

const router = express.Router();


router.post('/', controller.changeUserPassword);

module.exports = router;
