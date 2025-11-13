
const mongoose = require("mongoose");
const { Schema } = mongoose;

const userSchema = new Schema({
  name: {
    type: String,
    required : true,
    minLength : 4,
  },
  email : {
    type : String,
    lowercase : true,
    required : true,
    trim : true
  },
  favMovie: {
    type: String,
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
  },
  studying: {
    type: String,
    default : 'programming'
  },
},
{
    timestamps : true,
  },
);

module.exports = mongoose.model("user", userSchema);
