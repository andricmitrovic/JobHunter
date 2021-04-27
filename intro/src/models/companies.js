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
        location: {
            type: mongoose.Schema.Types.String,
            required: true
        },
        password: {
            type: mongoose.Schema.Types.String,
            required: true
        }
    },

    positions: [
        {
        positionName: {
            type: mongoose.Schema.Types.String,
            required: true
        },
        positionTeam: {
            type: mongoose.Schema.Types.String,
            required: true
        },
        length: {
            type: mongoose.Schema.Types.String,
            required: true
        },
        techologies: [mongoose.Schema.Types.String],
        languages: [mongoose.Schema.Types.String],
        }
    ],

    about: mongoose.Schema.Types.String
});

const Company = mongoose.model('Company', userSchema, 'companies');

module.exports = Company;
