const companiesService = require('../services/companies');
const validator = require('validator');


const getAllCompanies = async (req, res, next) => {
  try {
    const allCompanies = await companiesService.getAllCompanies();
    res.status(200).json(allCompanies);
  } catch (error) {
    next(error);
  }
};

const getCompanyByUsername = async (req, res, next) => {
  const username = req.params.username;

  try {
    if (username == undefined) {
      const error = new Error('Nedostaje korisnicko ime!');
      error.status = 400;
      throw error;
    }

    const company = await companiesService.getCompanyByUsername(username);
    if (company == null) {
      res.status(404).json();
    } else {
      res.status(200).json(company);
    }
  } catch (error) {
    next(error);
  }
};

const addNewCompany = async (req, res, next) => {
  const { username, personalInfo, positions, about } = req.body;
  
  try
  {
    if (
      !username ||

      !personalInfo.fullName ||
      !personalInfo.adress ||
      !personalInfo.email ||
      !personalInfo.password ||

      // !positions ||
      // !about ||

      !validator.isEmail(personalInfo.email) ||
      !validator.isAlphanumeric(username)      
    ) 
    {
      res.status(400).json('Proverite prosledjene podatke!');
    }

    const exists = await companiesService.getCompanyByUsername(username);
    if (exists) 
    {
      res.status(403).json('Proverite prosledjene podatke!');
    }

    const newCompany = await companiesService.addNewCompany(username, personalInfo, positions, about);
    res.status(201).json(newCompany);

  } catch(error)
  {
    next(error);
  }
    
};

// const changeUserPassword = (req, res) => {
//   const { username, oldPassword, newPassword } = req.body;

//   if (!username || !oldPassword || !newPassword) {
//     res.status(400).json();
//   } else {
//     const isChanged = users.changeUserPassword(
//       username,
//       oldPassword,
//       newPassword
//     );
//     if (isChanged) {
//       const user = users.getUserByUsername(username);
//       res.status(200).json(user);
//     } else {
//       res.status(404).json();
//     }
//   }
// };

// const deleteUser = (req, res) => {
//   const username = req.params.username;

//   if (!username) {
//     res.status(400).json();
//   } else {
//     const isDeleted = users.deleteUser(username);
//     if (isDeleted) {
//       res.status(200).json();
//     } else {
//       res.status(404).json();
//     }
//   }
// };

module.exports = {
    getAllCompanies,
    getCompanyByUsername,
    addNewCompany,
  // changeUserPassword,
  // deleteUser,
};
