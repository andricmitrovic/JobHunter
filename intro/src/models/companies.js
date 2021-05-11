const mongoose = require('mongoose');
const mongoosePaginate = require('mongoose-paginate-v2');

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
        positionExp: {
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

userSchema.plugin(mongoosePaginate);

const Company = mongoose.model('Company', userSchema, 'companies');

module.exports = Company;
