const express = require('express');
const app = require('../../app');
const controller = require('../../controllers/students');
const verifyToken = require('./../../utils/authentication');

const router = express.Router();

router.get('/', controller.getAllStudents);
router.get('/:email', controller.getStudentByEmail);

//router.post('/', controller.addNewStudent);
router.post('/', controller.Login);



module.exports = router;
