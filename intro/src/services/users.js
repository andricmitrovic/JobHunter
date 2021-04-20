const mongoose = require('mongoose');
const User = require('../models/users');

const getAllUsers = async () => {
  const users = await User.find({}).exec();
  return users;
};
// const getAllUsers = () => {
//   return users;
// };

// const getUserByUsername = (username) => {
//   const findUsers = users.filter((user) => user.username == username);
//   return findUsers.length > 0 ? findUsers[0] : null;
// };

// const addNewUser = (username, personalInfo, education, experience,
//                     techologies, languages, portfolio, about) => {

//   let isAdded = false;

//   const newUser = {
//     id: uuid.v4(),
//     username,
//     personalInfo,
//     education,
//     experience,
//     techologies,
//     languages,
//     portfolio,
//     about
//   };

//   const user = getUserByUsername(username);

//   if (user == null) {
//     users.push(newUser);
//     isAdded = true;
//   }

//   return isAdded;
// };

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
  getAllUsers
  // getUserByUsername,
  // addNewUser,
  // changeUserPassword,
  // deleteUser,
};
