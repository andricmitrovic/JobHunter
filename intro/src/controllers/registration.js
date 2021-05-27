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
      res.status(404).json();
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
    //  !username ||

        !personalInfo.fullName ||
      //!personalInfo.adress ||
        !email ||
     // !personalInfo.gender ||
     // !personalInfo.dateOfBirth ||
        !personalInfo.password ||

     // !education.university ||
     // !education.faculty ||
     // !education.gpa ||

     // !experience ||
     // !techologies ||
     // !languages ||

      // !portfolio ||
      // !about ||

       !validator.isEmail(email)
     // !validator.isAlphanumeric(username)

    )
    {
      res.status(400).json('Proverite prosledjene podatke1! ' + email);
    }

    const exists = await studentsService.getStudentByEmail(email);
    if (exists)
    {
      res.status(403).json('Korisnik sa ovim emailom je vec registrovan!');
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


