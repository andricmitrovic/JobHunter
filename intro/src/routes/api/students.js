const express = require('express');
const controller = require('../../controllers/students');
const verifyToken = require('./../../utils/authentication');

const router = express.Router();

router.get('/', controller.getAllStudents);
router.get('/:username', controller.getStudentByUsername);

router.post('/', verifyToken, controller.addNewStudent);
// router.put('/', controller.changeUserPassword);

router.delete('/:username', verifyToken, controller.deleteStudent);

module.exports = router;