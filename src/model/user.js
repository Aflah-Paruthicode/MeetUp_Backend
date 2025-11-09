
const mongoose = require("mongoose");
const { Schema } = mongoose;

const userSchema = new Schema({
  name: {
    type: String,
  },
  favMovie: {
    type: String,
  },
  place: {
    type: String,
  },
  studying: {
    type: String,
  },
});

module.exports = mongoose.model("user", userSchema);
