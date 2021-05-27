const studentsService = require('../services/students');
const validator = require('validator');
const jwt = require('jsonwebtoken');
const { json } = require('body-parser');
const Student = require('../models/students');
const Jwtsecret = process.env.JWT_SECRET || 'masasavic'



const getAllStudents = async (req, res, next) => {
  try {

    page = req.query.page;
    limit = req.query.limit;
    adress = req.query.adress;
    requiredTechnologies = req.query.requiredTechnologies;
    faculty = req.query.faculty;
    searchString = req.query.searchString;

    const allStudents = await studentsService.paginateThroughStudents(page, limit, adress, requiredTechnologies, faculty, searchString);
    res.status(200).json(allStudents);
  } catch (error) {
    next(error);
  }
};

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

const changeUserPassword = async (req, res, next) => {
  const email = req.params.email;
   const { oldPassword, newPassword } = req.body;
   try {

    if (!email || !oldPassword || !newPassword) {
      const error = new Error('Greska u podacima!');
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
    const changedStudent = await this.studentsService.changePassword(email, oldPassword, newPassword);


    res.status(200).json({
      success: true
    });
  }catch(error){
    next(error);
  }
};


const Login = async (req, res, next) => {

  const email = req.body.email;
  const password = req.body.password;
  try {
    const user = await studentsService.getStudentByEmail(email);
    if (!user) {
      const error = new Error('Pogresan mejl!');
      error.status = 404;
      throw error;
    }

    if (user.personalInfo.password != password){
      const error = new Error('Pogresna lozinka!');
      error.status = 400;
      throw error;
    }

    res.status(200).json({
      token: jwt.sign(user.toJSON(), Jwtsecret)
    });
  } catch (error) {
    next(error);
  }
};


module.exports = {
  getStudentByEmail,
  getAllStudents,
  changeUserPassword,
  Login
};
