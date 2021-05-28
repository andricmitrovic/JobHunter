const express = require('express');
const controller = require('../../controllers/profileCompanies');
const verifyToken = require('./../../utils/authentication');

const router = express.Router();

//router.post('/', controller.changeUserPassword);
router.post('/', controller.updateProfile);
router.get('/', controller.deleteCompany);

module.exports = router;
