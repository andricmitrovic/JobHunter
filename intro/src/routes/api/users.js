const express = require('express');
const controller = require('../../controllers/users');


const router = express.Router();

router.get('/', controller.getAllUsers);
router.get('/:username', controller.getUserByUsername);
router.post('/', controller.addNewUser);
// router.put('/', controller.changeUserPassword);

// router.delete('/:username', controller.deleteUser);

module.exports = router;
