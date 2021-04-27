const mongoose = require('mongoose');
const Company = require('../models/companies');


const getAllCompanies = async () => {
  const companies = await Company.find({}).exec();
  return companies;
};

const getCompanyByUsername = async (username) => {
  const company = await Company.findOne({ username: username }).exec();
  return company;
};

const addNewCompany = async (username, personalInfo, positions, about) => {

  // let isAdded = false;

  const newCompany = new Company({
    _id: new mongoose.Types.ObjectId(),
    username, 
    personalInfo, 
    positions, 
    about
  });

  // const user = getUserByUsername(username);

  // if (user == null) {
  //   await newUser.save();
  //   isAdded = true;
  // }

  // return isAdded;

  await newCompany.save();
  return newCompany;

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
  getAllCompanies,
  getCompanyByUsername,
  addNewCompany,
  // changeUserPassword,
  // deleteUser,
};
