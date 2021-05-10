const studentsService = require('../services/students');
const validator = require('validator');


const getAllStudents = async (req, res, next) => {
  try {
    const allStudents = await studentsService.paginateThroughStudents();
    res.status(200).json(allStudents);
  } catch (error) {
    next(error);
  }
};

const getStudentByUsername = async (req, res, next) => {
  const username = req.params.username;

  try {
    if (username == undefined) {
      const error = new Error('Nedostaje korisnicko ime!');
      error.status = 400;
      throw error;
    }

    const student = await studentsService.getStudentByUsername(username);
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
  const { username, personalInfo, education, experience,
    techologies, languages, portfolio, about } = req.body;
  
  try
  {
    if (
      !username ||

      !personalInfo.fullName ||
      !personalInfo.adress ||
      !personalInfo.email ||
      !personalInfo.gender ||
      !personalInfo.dateOfBirth ||
      !personalInfo.password ||

      !education.university ||
      !education.faculty ||
      !education.gpa ||
      
      !experience ||
      !techologies ||
      !languages ||

      // !portfolio ||
      // !about ||

      !validator.isEmail(personalInfo.email) ||
      !validator.isAlphanumeric(username)      
    ) 
    {
      res.status(400).json('Proverite prosledjene podatke!');
    }

    const exists = await studentsService.getStudentByUsername(username);
    if (exists) 
    {
      res.status(403).json('Proverite prosledjene podatke!');
    }

    const newStudent = await studentsService.addNewStudent(username, personalInfo, education, experience, techologies, languages, portfolio, about);
    res.status(201).json(newStudent);

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


module.exports = {
  getStudentByUsername,
  getAllStudents,
  addNewStudent,
  // changeUserPassword,
  deleteStudent
};