const express = require('express');
const controller = require('../../controllers/students');


const router = express.Router();

router.get('/', controller.getAllStudents);
router.get('/:username', controller.getStudentByUsername);
router.post('/', controller.addNewStudent);
// router.put('/', controller.changeUserPassword);

// router.delete('/:username', controller.deleteUser);

module.exports = router;
