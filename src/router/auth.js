const express = require("express");
const authRouter = express.Router();
const { validateSignUpData } = require("../utils/validation");
const bcrypt = require("bcrypt");
const User = require("../model/user");
const jwt = require("jsonwebtoken");
const { userAuth } = require("../middlewares/auth");

authRouter.post("/signup", async (req, res) => {
  try {
    const { name, email, password, favMovie, gender, place, studying } =
      req.body;
    const passwordHash = await bcrypt.hash(password, 10);
    validateSignUpData(req);
    const isEmailUnique = await User.find({ email: email });
    if (isEmailUnique.length !== 0)
      throw new Error("Email is already registered");
    const user = new User({
      name,
      email,
      password: passwordHash,
      favMovie,
      gender,
      place,
      studying,
    });
    await user.save();
    res.send("Document added successfull");
  } catch (error) {
    res.status(400).send("Error Occured In Adding Doc - " + error.message);
  }
});

authRouter.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email: email });
    if (!user) throw new Error("Invalid credentials");
    const isPaswordValid = await bcrypt.compare(password, user.password);
    if (!isPaswordValid) throw new Error("Invalid credentials");
    const token = await jwt.sign({ _id: user._id }, "DEV@CHATIME$790", {
      expiresIn: "7d",
    });
    res.cookie("token", token);
    res.status(200).send("Login Succeccfull");
  } catch (err) {
    res.status(404).send("Error in login - " + err);
  }
});

authRouter.post("/logout", (req, res) => {
  res.cookie("token", null, { expires: new Date(Date.now()) });
  res.send("logout successfull");
});

module.exports = authRouter;
