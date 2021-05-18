const express = require('express');
const controller = require('../../controllers/companies');
const verifyToken = require('./../../utils/authentication');

const router = express.Router();

router.get('/', controller.getAllCompanies);
router.get('/:username', controller.getCompanyByUsername);

router.post('/', controller.addNewCompany);
// router.put('/', controller.changeUserPassword);

router.delete('/:username', verifyToken, controller.deleteCompany);

module.exports = router;
