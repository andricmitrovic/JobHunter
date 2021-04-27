const mongoose = require('mongoose');
const Student = require('../models/students');


const getAllStudents = async () => {
  const students = await Student.find({}).exec();
  return students;
};

const getStudentByUsername = async (username) => {
  const student = await Student.findOne({ username: username }).exec();
  return student;
};

const addNewStudent = async (username, personalInfo, education, experience,
                    techologies, languages, portfolio, about) => {

  // let isAdded = false;

  const newStudent = new Student({
    _id: new mongoose.Types.ObjectId(),
    username,
    personalInfo,
    education,
    experience,
    techologies,
    languages,
    portfolio,
    about
  });

  // const user = getUserByUsername(username);

  // if (user == null) {
  //   await newUser.save();
  //   isAdded = true;
  // }

  // return isAdded;

  await newStudent.save();
  return newStudent;

};

// const changeUserPassword = (username, oldPassword, newPassword) => {
//   const foundUser = users.find(user => user.username == username && user.password == oldPassword);
//   if (!foundUser) {
//     return false;
//   }

//   foundUser.password = newPassword;
//   return true;
// };

// const deleteUser = (username) => {
//   const userIndex = users.findIndex(user => user.username == username);
//   if (userIndex == -1) {
//     return false;
//   }
  
//   users.splice(userIndex, 1);
//   return true;
// };

module.exports = {
  getAllStudents,
  getStudentByUsername,
  addNewStudent,
  // changeUserPassword,
  // deleteUser,
};
