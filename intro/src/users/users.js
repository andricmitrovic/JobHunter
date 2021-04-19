const uuid = require('uuid');

const users = [
  {
    id: '996bcb75-f0cc-4cf0-afcd-5a491c13172a',
    username: 'john',

    personalInfo: {
        fullName: 'John Johnson',
        adress: 'Beograd',
        email: 'john@matf.bg.ac.rs',
        gender: 'male',
        password: 'john123',
    },

    education: {
        university: 'University of Belgrade',
        faculty: 'Matematicki fakultet',
        gpa: '9.0'
    },

    experience: [
        { company: 'Google', position: 'clound internship', length: '3 months'},
        { company: 'Facebook', position: 'backend internship', length: '3 months'}
    ],

    techologies: ['js', 'java', 'c#'],
    languages: ['english', 'japanese'],

    portfolio: {
        gitHub: 'https://github.com/andricmitrovic',
        linkedin: 'https://www.linkedin.com/in/nikola-a-b03a6412a/'
    },

    about: 'Errare humanum est, stultum est in errore perseverare'
    
  },

  {
    id: 'c0e4cdac-d240-4900-88b8-238e42199c96',
    username: 'pavle',

    personalInfo: {
        fullName: 'Pavle Pavlic',
        adress: 'Nis',
        email: 'pavle@gmail.com',
        gender: 'male',
        password: 'pavle123',

    },

    education: {
        university: 'University of Belgrade',
        faculty: 'Matematicki fakultet',
        gpa: '9.0'
    },

    experience: [
        { company: 'Google', position: 'clound internship', length: '3 months'},
        { company: 'Facebook', position: 'backend internship', length: '3 months'}
    ],

    techologies: ['js', 'java', 'c#'],
    languages: ['english', 'japanese'],

    portfolio: {
        gitHub: 'https://github.com/andricmitrovic',
        linkedin: 'https://www.linkedin.com/in/nikola-a-b03a6412a/'
    },

    about: 'Errare humanum est, stultum est in errore perseverare'    
  },

  {
    id: '2f7cc58a-84fb-4312-89b4-c24cfd43ab2d',
    username: 'maja',

    personalInfo: {
        fullName: 'Maja Majic',
        adress: 'Novi Sad',
        email: 'maja@gmail.com',
        gender: 'female',
        password: 'maja123',
    },

    education: {
        university: 'University of Belgrade',
        faculty: 'Matematicki fakultet',
        gpa: '9.0'
    },

    experience: [
        { company: 'Google', position: 'clound internship', length: '3 months'},
        { company: 'Facebook', position: 'backend internship', length: '3 months'}
    ],

    techologies: ['js', 'java', 'c#'],
    languages: ['english', 'japanese'],

    portfolio: {
        gitHub: 'https://github.com/andricmitrovic',
        linkedin: 'https://www.linkedin.com/in/nikola-a-b03a6412a/'
    },

    about: 'Errare humanum est, stultum est in errore perseverare'
    
  },

  {
    id: '53eba886-e0dc-4bc6-9a75-89f66ffc0cef',

    personalInfo: {
        username: 'klara',
        fullName: 'Klara Klaric',
        adress: 'Kragujevac',
        email: 'klara@gmail.com',
        gender: 'female',
        password: 'klara123',
    },

    education: {
        university: 'University of Belgrade',
        faculty: 'Matematicki fakultet',
        gpa: '9.0'
    },

    experience: [
        { company: 'Google', position: 'clound internship', length: '3 months'},
        { company: 'Facebook', position: 'backend internship', length: '3 months'}
    ],

    techologies: ['js', 'java', 'c#'],
    languages: ['english', 'japanese'],

    portfolio: {
        gitHub: 'https://github.com/andricmitrovic',
        linkedin: 'https://www.linkedin.com/in/nikola-a-b03a6412a/'
    },

    about: 'Errare humanum est, stultum est in errore perseverare'
    
  },
];

const getAllUsers = () => {
  return users;
};

const getUserByUsername = (username) => {
  const findUsers = users.filter((user) => user.username == username);
  return findUsers.length > 0 ? findUsers[0] : null;
};

const addNewUser = (username, personalInfo, education, experience,
                    techologies, languages, portfolio, about) => {

  let isAdded = false;

  const newUser = {
    id: uuid.v4(),
    username,
    personalInfo,
    education,
    experience,
    techologies,
    languages,
    portfolio,
    about
  };

  const user = getUserByUsername(username);

  if (user == null) {
    users.push(newUser);
    isAdded = true;
  }

  return isAdded;
};

const changeUserPassword = (username, oldPassword, newPassword) => {
  const foundUser = users.find(user => user.username == username && user.password == oldPassword);
  if (!foundUser) {
    return false;
  }

  foundUser.password = newPassword;
  return true;
};

const deleteUser = (username) => {
  const userIndex = users.findIndex(user => user.username == username);
  if (userIndex == -1) {
    return false;
  }
  
  users.splice(userIndex, 1);
  return true;
};

module.exports = {
  getAllUsers,
  getUserByUsername,
  addNewUser,
  changeUserPassword,
  deleteUser,
};
