const studentsService = require('../services/students');
const validator = require('validator');


const getAllStudents = async (req, res, next) => {
  try {
    const allStudents = await studentsService.getAllStudents();
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

// const deleteUser = (req, res) => {
//   const username = req.params.username;

//   if (!username) {
//     res.status(400).json();
//   } else {
//     const isDeleted = users.deleteUser(username);
//     if (isDeleted) {
//       res.status(200).json();
//     } else {
//       res.status(404).json();
//     }
//   }
// };

module.exports = {
  getStudentByUsername,
  getAllStudents,
  addNewStudent,
  // changeUserPassword,
  // deleteUser,
};
