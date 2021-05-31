const studentsService = require('../services/students');
const validator = require('validator');
const jwt = require('jsonwebtoken');
const { json } = require('body-parser');
const Student = require('../models/students');
const Jwtsecret = process.env.JWT_SECRET || 'masasavic'

const changeUserPassword = async (req, res, next) => {

  const email = req.body.email;
  const oldPassword = jwt.sign(req.body.old_password, Jwtsecret);
  const newPassword = jwt.sign(req.body.new_password, Jwtsecret);
  try {

    if (!email || !oldPassword || !newPassword) {
      const error = new Error('Greska u podacima!' + email + oldPassword + newPassword);
      error.status = 404;
      throw error;
   }

    const student = await studentsService.getStudentByEmail(email);
    // Ovo nam ne treba jer se poziva samo kada je ulogovan student
    if (!student) {
      const error = new Error('Proverite email!');
      error.status = 404;
      throw error;
    }
    if (student.personalInfo.password != oldPassword){
      const error = new Error('Neispravna lozinka!');
      error.status = 403;
      throw error;
    }
    await studentsService.changePassword(email, oldPassword, newPassword);


    res.status(200).json({
      success: true
    });
  }catch(error){
    next(error);
  }
};

module.exports = {
  changeUserPassword
};
