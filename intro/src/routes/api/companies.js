const express = require('express');
const controller = require('../../controllers/companies');


const router = express.Router();

router.get('/', controller.getAllCompanies);
router.get('/:username', controller.getCompanyByUsername);
router.post('/', controller.addNewCompany);
// router.put('/', controller.changeUserPassword);

// router.delete('/:username', controller.deleteUser);

module.exports = router;
