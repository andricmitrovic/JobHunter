const express = require('express');
const controller = require('../../controllers/profile');
const verifyToken = require('./../../utils/authentication');

const router = express.Router();

//router.post('/', controller.changeUserPassword);
router.post('/', controller.updateProfile);
router.get('/', controller.deleteStudent);

module.exports = router;
