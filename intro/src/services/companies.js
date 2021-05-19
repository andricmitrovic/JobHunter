const mongoose = require('mongoose');
const Company = require('../models/companies');


const getAllCompanies = async () => {
  const companies = await Company.find({}).exec();
  return companies;
};

async function paginateThroughCompanies(page = 1, limit = 10, adress = "all", positionSeniority = "all", length = "all", searchString = "all") {

  const query = Company.find()  // radi i sa findOne ???
  
  if ( adress !== "all" )
  {
    query.where('personalInfo.adress').equals(adress);
  }
  if ( positionSeniority !== "all" )
  {
    query.where('positions.positionExp').in(positionSeniority);
  }

  if ( searchString !== "all" )
  {
    query.find({ "personalInfo.fullName": { "$regex": searchString, "$options": "i" } });
  }

  // Todo 

  // if ( length !== undefined )
  // {
  //   length = 3;
  //   query.where(parseInt('positions.length'.split(' ')[0])).equals(lenght);
  // }

  return await Company.paginate(query, { page, limit, populate: 'owner', sort: 'timestamp', projection: '-timestamp' });
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
