
const mongoose = require("mongoose");
const { Schema } = mongoose;
const validator = require('validator')

const userSchema = new Schema({
  name: {
    type: String,
    required : true,
    minLength : 4,
    maxLength : 30,
  },
  email : {
    type : String,
    lowercase : true,
    required : true,
    trim : true,
    maxLength : 50,
    validate(value) {
      if(!validator.isEmail(value)) {
        throw new Error('Email is not valid')
      }
    }

  },
  password : {
    type : String,
    required : true,
    validate(value) {
      if(!validator.isStrongPassword(value)) {
        throw new Error('Password Not Valid')
      }
    }
  },
  favMovie: {
    type: String,
    maxLength : 30,
    minLength : 1,
  },
  gender : {
    type : String,
    required : true,
    validate(value) {
      if(!['male','female','others'].includes(value)) {
        throw new Error('Gender Data is invalid')
      }
    }
  },
  place: {
    type: String,
    maxLength : 30,
    minLength : 4
  },
  studying: {
    type: String,
    default : 'programming',
    maxLength : 30,
    minLength : 4
  },
},
{
    timestamps : true,
  },
);

module.exports = mongoose.model("user", userSchema);
