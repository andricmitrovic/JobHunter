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

const getCompanyByEmail = async (email) => {
  const company = await Company.findOne({ email: email }).exec();
  return company;
};

const addNewCompany = async (email, personalInfo, positions, about) => {

  // let isAdded = false;

  const newCompany = new Company({
    _id: new mongoose.Types.ObjectId(),
    email,
    personalInfo,
    positions,
    about
  });

  await newCompany.save();
  return newCompany;

};

const changePassword = async (email, oldPassword, newPassword) => {

  const query = {email: email, 'personalInfo.password': oldPassword};

  await Student.findOneAndUpdate(query,
    {$set : {'personalInfo.password' : newPassword}});
  const stud = await Company.findOne({email:email}).exec();
  return stud;
 };

 const updateProfile = async (email, personalInfo, positions, about) => {

  const query = {email: email};

  await Student.findOneAndUpdate(query,
    {$set : {'personalInfo' : personalInfo,
            'positions' : positions},
            'about': about,
            });
  return await Student.findOne({email:email});
 };


const deleteCompany = async (email) => {
  await Company.findOneAndDelete({ email: email}).exec();
};


module.exports = {
  paginateThroughCompanies,
  getAllCompanies,
  getCompanyByEmail,
  addNewCompany,
  changePassword,
  deleteCompany
};
