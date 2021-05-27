const express = require('express');
const app = require('../../app');
const controller = require('../../controllers/students');
const verifyToken = require('./../../utils/authentication');

const router = express.Router();

router.get('/', controller.getAllStudents);
router.get('/:email', controller.getStudentByEmail);


router.post('/', controller.Login)

router.post('/', verifyToken, controller.addNewStudent);

//router.delete('/:username', verifyToken, controller.deleteStudent);

module.exports = router;
