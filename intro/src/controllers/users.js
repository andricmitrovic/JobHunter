const users = require('../services/users');
const validator = require('validator');

const getAllUsers = (req, res) => {
  const allUsers = users.getAllUsers();
  res.status(200).json(allUsers);
};

const getUserByUsername = (req, res) => {
  const username = req.params.username;
  console.log(username);

  if (username == undefined) {
    res.status(400).json();
  } else {
    const user = users.getUserByUsername(username);
    if (user == null) {
      res.status(404).json();
    } else {
      res.status(200).json(user);
    }
  }
};

const addNewUser = (req, res) => {
  const { username, personalInfo, education, experience,
    techologies, languages, portfolio, about } = req.body;

  if (
    !username ||

    !personalInfo.fullName ||
    !personalInfo.adress ||
    !personalInfo.email ||
    !personalInfo.gender ||
    !personalInfo.dateOfBirth ||
    !personalInfo.password ||

    !education.university ||
    !education.faculty ||
    !education.gpa ||
    
    !experience ||
    !techologies ||
    !languages ||

    // !portfolio ||
    // !about ||

    !validator.isEmail(personalInfo.email) ||
    !validator.isAlphanumeric(username)         // not a function ??
  ) {
    res.status(400).json();
  } else {
    const isAdded = users.addNewUser(username, personalInfo, education, experience, techologies, languages, portfolio, about);
    if (isAdded) {
      const user = users.getUserByUsername(username);
      res.status(201).json(user);
    } else {
      res.status(403).json();
    }
  }
};

const changeUserPassword = (req, res) => {
  const { username, oldPassword, newPassword } = req.body;

  if (!username || !oldPassword || !newPassword) {
    res.status(400).json();
  } else {
    const isChanged = users.changeUserPassword(
      username,
      oldPassword,
      newPassword
    );
    if (isChanged) {
      const user = users.getUserByUsername(username);
      res.status(200).json(user);
    } else {
      res.status(404).json();
    }
  }
};

const deleteUser = (req, res) => {
  const username = req.params.username;

  if (!username) {
    res.status(400).json();
  } else {
    const isDeleted = users.deleteUser(username);
    if (isDeleted) {
      res.status(200).json();
    } else {
      res.status(404).json();
    }
  }
};

module.exports = {
  getUserByUsername,
  getAllUsers,
  addNewUser,
  changeUserPassword,
  deleteUser,
};
