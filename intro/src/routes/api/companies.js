const express = require('express');
const controller = require('../../controllers/companies');
const verifyToken = require('./../../utils/authentication');

const router = express.Router();

router.get('/', controller.getAllCompanies);
router.get('/:email', controller.getCompanyByEmail);

router.post('/', controller.Login);

router.delete('/:username', verifyToken, controller.deleteCompany);

module.exports = router;
