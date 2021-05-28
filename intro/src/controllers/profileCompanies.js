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
      const error = new Error('Nedostaje email ime!');
      error.status = 400;
      throw error;
    }

    const company = await companyService.getCompanyByEmail(email);
    if (company == null) {
      res.status(404).json();
    } else {
      res.status(200).json(company);
    }
  } catch (error) {
    next(error);f
  }
};

const changePassword = async (req, res, next) => {

  const email = req.body.email;
  const oldPassword = req.body.old_password;
  const newPassword = req.body.new_password;

   try {

    if (!email || !oldPassword || !newPassword) {
      const error = new Error('Greska u podacima! ');
      error.status = 404;
      throw error;
   }

    const company = await companyService.getCompanyByEmail(email);
    // Ovo nam ne treba jer se poziva samo kada je ulogovan company
    if (!company) {
      const error = new Error('Proverite email!');
      error.status = 404;
      throw error;
    }
    if (company.personalInfo.password != oldPassword){
      const error = new Error('Neispravna lozinka!');
      error.status = 403;
      throw error;
    }


    await companyService.changePassword(email, oldPassword, newPassword);

    res.status(200).json({
      success: true
    });
  }catch(error){
    next(error);
  }
};

const deleteCompany = async (req, res, next) => {
  const email = req.query.email;

  try {
    if (!email) {
      const error = new Error('Nedostaje email !' + email);
      error.status = 400;
      throw error;
    }

    const user = await companyService.getCompanyByEmail(email);
    if (!user) {
      const error = new Error('Proverite korisnicko ime!');
      error.status = 404;
      throw error;
    }

    await companyService.deleteCompany(email);
    res.status(200).json({
      success: "success"
    });
  } catch (error) {
    next(error);
  }
};

const updateProfile = async (req, res, next) => {
  const company = req.body.company;

  try {
    if (!company.email) {
      const error = new Error('Nedostaje email !');
      error.status = 400;
      throw error;
    }

    const user = await companyService.getCompanyByEmail(company.email);
    if (!user) {
      const error = new Error('Proverite korisnicko ime!');
      error.status = 404;
      throw error;
    }


    const stud = await companyService.updateProfile(company.email, company.personalInfo, company.positions,
        company.about);
    res.status(200).json({
        token : jwt.sign(stud.toJSON(), Jwtsecret)
    });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  getCompanyByEmail,
  changePassword,
  updateProfile,
  deleteCompany
};
