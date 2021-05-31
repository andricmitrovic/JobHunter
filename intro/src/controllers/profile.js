const studentsService = require('../services/students');
const validator = require('validator');
const jwt = require('jsonwebtoken');
const { json } = require('body-parser');
const Student = require('../models/students');
const Jwtsecret = process.env.JWT_SECRET || 'masasavic'


const getStudentByEmail = async (req, res, next) => {

  const email = req.params.email;

  try {
    if (email == undefined) {
      const error = new Error('Nedostaje email ime!');
      error.status = 400;
      throw error;
    }

    const student = await studentsService.getStudentByEmail(email);
    if (student == null) {
      res.status(404).json();
    } else {
      res.status(200).json(student);
    }
  } catch (error) {
    next(error);f
  }
};


const deleteStudent = async (req, res, next) => {
  const email = req.query.email;

  try {
    if (!email) {
      const error = new Error('Nedostaje email !' + email);
      error.status = 400;
      throw error;
    }

    const user = await studentsService.getStudentByEmail(email);
    if (!user) {
      const error = new Error('Proverite korisnicko ime!');
      error.status = 404;
      throw error;
    }

    await studentsService.deleteStudent(email);
    res.status(200).json({
      success: "success"
    });
  } catch (error) {
    next(error);
  }
};

const updateProfile = async (req, res, next) => {
  const student = req.body.student;

  try {
    if (!student.email) {
      const error = new Error('Nedostaje email !');
      error.status = 400;
      throw error;
    }

    const user = await studentsService.getStudentByEmail(student.email);
    if (!user) {
      const error = new Error('Proverite korisnicko ime!');
      error.status = 404;
      throw error;
    }


    const stud = await studentsService.updateProfile(student.email, student.personalInfo,
       student.portfolio, student.about, student.education, student.technologies, student.experience);
    res.status(200).json({
        token : jwt.sign(stud.toJSON(), Jwtsecret)
    });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  getStudentByEmail,
  updateProfile,
  deleteStudent
};
