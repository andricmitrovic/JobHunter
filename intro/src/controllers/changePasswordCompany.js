const companyService = require('../services/companies');
const validator = require('validator');
const jwt = require('jsonwebtoken');
const { json } = require('body-parser');
const Company = require('../models/companies');
const Jwtsecret = process.env.JWT_SECRET || 'masasavic'

const changeUserPassword = async (req, res, next) => {

  const email = req.body.email;
  const oldPassword = req.body.old_password;
  const newPassword = req.body.new_password;
  try {

    if (!email || !oldPassword || !newPassword) {
      const error = new Error('Greska u podacima!' + email + oldPassword + newPassword);
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

module.exports = {
  changeUserPassword
};
