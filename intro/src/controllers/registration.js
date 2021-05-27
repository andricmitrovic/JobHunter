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
      const error = new Error('Nedostaje email!');
      error.status = 400;
      throw error;
    }

    const student = await studentsService.getStudentByEmail(email);
    if (student == null) {
      const error = new Error('Student does not exists!');
      error.status = 404;
      throw error;
    } else {
      res.status(200).json(student);
    }
  } catch (error) {
    next(error);
  }
};

const addNewStudent = async (req, res, next) => {
  const { email, personalInfo, education, experience,
    techologies, languages, portfolio, about } = req.body;


  try
  {
    if (
      !personalInfo.fullName ||

      !email ||
      !personalInfo.password ||
      !validator.isEmail(email)

    )
    {
      const error = new Error('Error in data!');
      error.status = 400;
      throw error;

    }

    const exists = await studentsService.getStudentByEmail(email);
    if (exists)
    {

      const error = new Error('Already exists!');
      error.status = 403;
      throw error;

    }

    const user = await studentsService.addNewStudent(email, personalInfo, education, experience, techologies, languages, portfolio, about);
    res.status(201).json({
      user
    });

  } catch(error)
  {
    next(error);
  }

};

module.exports = {
  getStudentByEmail,
  addNewStudent
};


