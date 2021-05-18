const mongoose = require('mongoose');
const Student = require('../models/students');


const getAllStudents = async () => {
  const students = await Student.find({}).exec();
  return students;
};

async function paginateThroughStudents(page = 1, limit = 10, adress, requiredTechnologies, faculty) {

  const query = Student.find()  // radi i sa findOne ???

  if ( adress!== undefined )
  {
    query.where('personalInfo.adress').equals(adress);
  }
  if ( requiredTechnologies !== undefined )
  {
    query.where('technologies').in(requiredTechnologies);
  }
  if ( faculty !== undefined )
  {
    query.where('education.faculty').in(faculty);
  }

  return await Student.paginate(query, { page, limit, populate: 'owner', sort: 'timestamp', projection: '-timestamp' });
}


const getStudentByEmail = async (email) => {
  const student = await Student.findOne({ email: email }).exec();
  return student;
};

const addNewStudent = async (email, personalInfo, education, experience,
                    techologies, languages, portfolio, about) => {

  const newStudent = new Student({
    _id: new mongoose.Types.ObjectId(),
    email,
    personalInfo,
    education,
    experience,
    techologies,
    languages,
    portfolio,
    about
  });

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

const deleteStudent = async (username) => {
  await Student.findOneAndDelete({ username: username }).exec();
};

module.exports = {
  paginateThroughStudents,
  getAllStudents,
  getStudentByEmail,
  addNewStudent,
  // changeUserPassword,
  deleteStudent
};
