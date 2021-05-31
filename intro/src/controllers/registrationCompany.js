const companyService = require('../services/companies');
const validator = require('validator');
const jwt = require('jsonwebtoken');
const { json } = require('body-parser');
const Company = require('../models/companies');
const Jwtsecret = process.env.JWT_SECRET || 'masasavic'

const getCompanyByEmail = async (req, res, next) => {
  const email = req.params.email;

  try {
    if (email == undefined) {
      const error = new Error('Nedostaje email!');
      error.status = 400;
      throw error;
    }

    const company = await companyService.getCompanyByEmail(email);
    if (company == null) {
      const error = new Error('Company does not exists!');
      error.status = 404;
      throw error;
    } else {
      res.status(200).json(company);
    }
  } catch (error) {
    next(error);
  }
};

const addNewCompany = async (req, res, next) => {
  const { email, personalInfo, positions, about } = req.body;


  try
  {
    if (
      !personalInfo.fullName ||

      !email ||
      !personalInfo.password ||
      !validator.isEmail(email)

    )
    {
      const error = new Error('Error in data!');
      error.status = 400;
      throw error;

    }

    const exists = await companyService.getCompanyByEmail(email);
    if (exists)
    {

      const error = new Error('Already exists!');
      error.status = 403;
      throw error;

    }
    personalInfo.password = jwt.sign(personalInfo.password, Jwtsecret);
    const user = await companyService.addNewCompany(email, personalInfo, positions, about);
    res.status(201).json({
      user
    });

  } catch(error)
  {
    next(error);
  }

};

module.exports = {
  getCompanyByEmail,
  addNewCompany
};


