const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    username: {
        type: mongoose.Schema.Types.String,
        required: true
    },

    personalInfo: {
        fullName: {
            type: mongoose.Schema.Types.String,
            required: true
        },
        adress: {
            type: mongoose.Schema.Types.String,
            required: true
        },
        email: {
            type: mongoose.Schema.Types.String,
            required: true
        },
        gender: {
            type: mongoose.Schema.Types.String,
            required: true
        },
        password: {
            type: mongoose.Schema.Types.String,
            required: true
        },
        dateOfBirth: {
            type: mongoose.Schema.Types.String,
            required: true
        }
    },

    education: {
        university: {
            type: mongoose.Schema.Types.String,
            required: true
        },
        faculty: {
            type: mongoose.Schema.Types.String,
            required: true
        },
        gpa: {
            type: mongoose.Schema.Types.String,             // mongoose.Schema.Types.Number
            required: true
        },
    },

    // default: "nesto"
    experience: [
        {
        company: {
            type: mongoose.Schema.Types.String,
            required: true
        },
        position: {
            type: mongoose.Schema.Types.String,
            required: true
        },
        length: {
            type: mongoose.Schema.Types.String,
            required: true
        }
        }
    ],

    techologies: [mongoose.Schema.Types.String],
    languages: [mongoose.Schema.Types.String],

    portfolio: {
        gitHub: {
            type: mongoose.Schema.Types.String,
            required: true
        },
        linkedin: {
            type: mongoose.Schema.Types.String,
            required: true
        },
    },

    about: [mongoose.Schema.Types.String]       // mozda bez zagrada ovde jer je jedan element a ne niz elemenata sa tim tipom
});



module.exports = userSchema;
