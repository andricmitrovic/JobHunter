const studentsService = require('../services/students');
const validator = require('validator');
const jwt = require('jsonwebtoken');
const { json } = require('body-parser');
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

    const jwt = await studentsService.addNewStudent(email, personalInfo, education, experience, techologies, languages, portfolio, about);
    res.status(201).json({
      user
    });

  } catch(error)
  {
    next(error);
  }

};

// const changeUserPassword = (req, res) => {
//   const { username, oldPassword, newPassword } = req.body;

//   if (!username || !oldPassword || !newPassword) {
//     res.status(400).json();
//   } else {
//     const isChanged = users.changeUserPassword(
//       username,
//       oldPassword,
//       newPassword
//     );
//     if (isChanged) {
//       const user = users.getUserByUsername(username);
//       res.status(200).json(user);
//     } else {
//       res.status(404).json();
//     }
//   }
// };

const deleteStudent = async (req, res, next) => {
  const username = req.params.username;

  try {
    if (!username) {
      const error = new Error('Nedostaje korisnicko ime!');
      error.status = 400;
      throw error;
    }

    const user = await studentsService.getStudentByUsername(username);
    if (!user) {
      const error = new Error('Proverite korisnicko ime!');
      error.status = 404;
      throw error;
    }

    await studentsService.deleteStudent(username);
    res.status(200).json();
  } catch (error) {
    next(error);
  }
};
const Login = async (req, res, next) => {

  const email = req.body.email;
  const password = req.body.password;
  try {
    if (!email) {
      const error = new Error('Nedostaje email!');
      error.status = 400;
      throw error;
    }

    const user = await studentsService.getStudentByEmail(email);
    if (!user) {
      const error = new Error('Proverite email!');
      error.status = 404;
      throw error;
    }

    if (user.personalInfo.password != password){
      const error = new Error('Pogresna lozinka!');
      error.status = 400;
      throw error;
    }

    res.status(200).json({
      token: jwt.sign(user.toJSON("utf8"), Jwtsecret)
    });
  } catch (error) {
    next(error);
  }
};


module.exports = {
  getStudentByEmail,
  getAllStudents,
  addNewStudent,
  Login,
  // changeUserPassword,
  deleteStudent
};
