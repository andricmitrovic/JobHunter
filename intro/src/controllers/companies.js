const companiesService = require('../services/companies');
const validator = require('validator');
const jwt = require('jsonwebtoken');
const { json } = require('body-parser');
const Jwtsecret = process.env.JWT_SECRET || 'masasavic'

const getAllCompanies = async (req, res, next) => {
  try {

    page = req.query.page;
    limit = req.query.limit;
    adress = req.query.adress;
    positionSeniority = req.query.positionSeniority;
    length = req.query.length;
    searchString = req.query.searchString;

    const allCompanies = await companiesService.paginateThroughCompanies(page, limit, adress, positionSeniority, length, searchString);
    res.status(200).json(allCompanies);
  } catch (error) {
    next(error);
  }
};

const getCompanyByEmail = async (req, res, next) => {
  const email = req.params.email;

  try {
    if (email == undefined) {
      const error = new Error('Nedostaje email!');
      error.status = 400;
      throw error;
    }

    const company = await companiesService.getCompanyByEmail(email);
    if (company == null) {
      res.status(404).json();
    } else {
      res.status(200).json(company);
    }
  } catch (error) {
    next(error);
  }
};

const deleteCompany = async (req, res, next) => {
  const email = req.params.email;

  try {
    if (!email) {
      const error = new Error('Nedostaje email!');
      error.status = 400;
      throw error;
    }

    const user = await companiesService.getCompanyByEmail(email);
    if (!user) {
      const error = new Error('Proverite email!');
      error.status = 404;
      throw error;
    }

    await companiesService.deleteCompany(email);
    res.status(200).json();
  } catch (error) {
    next(error);
  }
};

const Login = async (req, res, next) => {

  const email = req.body.email;
  const password = jwt.sign(req.body.password, Jwtsecret);
  try {
    const user = await companiesService.getCompanyByEmail(email);
    if (!user) {
      const error = new Error('Pogresan mejl!' + email);
      error.status = 404;
      throw error;
    }

    if (user.personalInfo.password != password){
      const error = new Error('Pogresna lozinka!');
      error.status = 400;
      throw error;
    }

    res.status(200).json({
      token: jwt.sign(user.toJSON(), Jwtsecret)
    });
  } catch (error) {
    next(error);
  }
};


module.exports = {
    getAllCompanies,
    getCompanyByEmail,
    Login,
    deleteCompany
};
