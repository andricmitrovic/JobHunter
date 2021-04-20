const mongoose = require('mongoose');
const User = require('../models/users');


const getAllUsers = async () => {
  const users = await User.find({}).exec();
  return users;
};

const getUserByUsername = async (username) => {
  const user = await User.findOne({ username: username }).exec();
  return user;
};

const addNewUser = async (username, personalInfo, education, experience,
                    techologies, languages, portfolio, about) => {

  // let isAdded = false;

  const newUser = new User({
    _id: new mongoose.Types.ObjectId(),
    username,
    personalInfo,
    education,
    experience,
    techologies,
    languages,
    portfolio,
    about
  });

  // const user = getUserByUsername(username);

  // if (user == null) {
  //   await newUser.save();
  //   isAdded = true;
  // }

  // return isAdded;

  await newUser.save();
  return newUser;

};

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
  getAllUsers,
  getUserByUsername,
  addNewUser,
  // changeUserPassword,
  // deleteUser,
};
