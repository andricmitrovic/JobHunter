const mongoose = require('mongoose');
const Student = require('../models/students');



const getAllStudents = async () => {
  const students = await Student.find({}).exec();
  return students;
};

async function paginateThroughStudents(page = 1, limit = 10, adress = "all", requiredTechnologies = undefined, faculty = undefined, searchString = "all") {

  const query = Student.find()  // radi i sa findOne ???

  if ( adress !== "all" )
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

  if ( searchString !== "all" )
  {
    query.find({ "personalInfo.fullName": { "$regex": searchString, "$options": "i" } });
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

const changePassword = async (email, oldPassword, newPassword) => {

  const query = {email: email, 'personalInfo.password': oldPassword};

  await Student.findOneAndUpdate(query,
    {$set : {'personalInfo.password' : newPassword}});
  const stud = await Student.findOne({email:email}).exec();
  return stud;
 };

 const updateProfile = async (email, personalInfo, portfolio, about, education
  , technologies, experience) => {

  const query = {email: email};

  await Student.findOneAndUpdate(query,
    {$set : {'personalInfo' : personalInfo,
            'portfolio' : portfolio},
            'about': about,
            'education': education,
            'technologies' : technologies,
            'experience': experience});
  return await Student.findOne({email:email});
 };


const deleteStudent = async (email) => {
  await Student.findOneAndDelete({ email: email}).exec();
};

module.exports = {
  paginateThroughStudents,
  getAllStudents,
  getStudentByEmail,
  addNewStudent,
  changePassword,
  deleteStudent,
  updateProfile
};
