const mongoose = require("mongoose");

const connectDb = async () => {
  await mongoose.connect(
    "mongodb+srv://aflah:@chatapp.ziqd6ut.mongodb.net/"
  );  
};

module.exports = {connectDb}
