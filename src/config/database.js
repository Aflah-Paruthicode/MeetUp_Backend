const mongoose = require("mongoose");
require("dotenv").config();

const pass = process.env.DB_PASSWORD;

const connectDb = async () => {
  await mongoose.connect("mongodb+srv://aflah:"+pass+"@chattime.myb23jr.mongodb.net/");
};

module.exports = { connectDb };
 