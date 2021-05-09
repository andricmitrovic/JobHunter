const mongoose = require('mongoose');
require('mongoose-type-email');

const userSchema = new mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    email: {
      type: mongoose.SchemaTypes.Email,
      required: true,
      unique: true
    },

    personalInfo: {
        name: {
            type: mongoose.Schema.Types.String,
            required: true
        },
        adress: {
            type: mongoose.Schema.Types.String,
            required: false
        },
        gender: {
            type: mongoose.Schema.Types.String,
            required: false
        },
        dateOfBirth: {
            type: mongoose.Schema.Types.Date,
            required: false
        },
        password: {
            type: mongoose.Schema.Types.String,
            required: true
        }
    },

    education: {
        university: {
            type: mongoose.Schema.Types.String,
            required: false
        },
        faculty: {
            type: mongoose.Schema.Types.String,
            required: false
        },
        gpa: {
            type: mongoose.Schema.Types.String,             // mongoose.Schema.Types.Number
            required: false
        },
    },

    // default: "nesto"
    experience: [
        {
        company: {
            type: mongoose.Schema.Types.String,
            required: false
        },
        position: {
            type: mongoose.Schema.Types.String,
            required: false
        },
        length: {
            type: mongoose.Schema.Types.String,
            required: false
        }
        }
    ],

    techologies: [mongoose.Schema.Types.String],
    languages: [mongoose.Schema.Types.String],

    portfolio: {
        gitHub: {
            type: mongoose.Schema.Types.String,
            required: false
        },
        linkedin: {
            type: mongoose.Schema.Types.String,
            required: false
        },
    },
    img:
    {
        data: mongoose.Schema.Types.Buffer,
        contentType: mongoose.Schema.Types.String
    },

    about: mongoose.Schema.Types.String
});

const Student = mongoose.model('Student', userSchema, 'students');


module.exports = Student;
