const mongoose = require('mongoose');
const mongoosePaginate = require('mongoose-paginate-v2');

const companySchema = new mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    email: {
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
            required: false
        },
        web : {
          type: mongoose.Schema.Types.String,
          required: false

        },
        password: {
            type: mongoose.Schema.Types.String,
            required: true
        }
    },

    positions:{
      type : [
        {
        positionName: {
            type: mongoose.Schema.Types.String,
            required: false
        },
        positionExp: {
            type: mongoose.Schema.Types.String,
            required: false
        },
        length: {
            type: mongoose.Schema.Types.String,
            required: false
        },
        techologies: [mongoose.Schema.Types.String],
        languages: [mongoose.Schema.Types.String],
        },

    ], required: false
  },
    about: {type: mongoose.Schema.Types.String, required: false}
});

companySchema.plugin(mongoosePaginate);

const Company = mongoose.model('Company', companySchema, 'companies');

module.exports = Company;
