const mongoose = require('mongoose');
const Company = require('../models/companies');


const getAllCompanies = async () => {
  const companies = await Company.find({}).exec();
  return companies;
};

async function paginateThroughCompanies(page = 1, limit = 10) {
  return await Company.paginate({}, { page, limit, populate: 'owner', sort: 'timestamp', projection: '-timestamp' });
}

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

const deleteCompany = async (username) => {
  await Company.findOneAndDelete({ username: username }).exec();
};

module.exports = {
  paginateThroughCompanies,
  getAllCompanies,
  getCompanyByUsername,
  addNewCompany,
  // changeUserPassword,
  deleteCompany
};
