const express = require("express");
const { connectDb } = require("./config/database");
const User = require("./model/user");
const { validateSignUpData } = require("./utils/validation");
const app = express();
const bcrypt = require("bcrypt");
const cookieParser = require("cookie-parser");
const jwt = require("jsonwebtoken");
const { userAuth } = require("./middlewares/auth");

app.use(express.json());
app.use(cookieParser());

app.post("/signup", userAuth, async (req, res) => {
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

app.post("/login", async (req, res) => {
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

app.get("/proffile", async (req, res) => {
  const { token } = req.cookies;
  try {
    const decodedToken = await jwt.verify(token, "DEV@CHATIME$790");
    const user = await User.find({ _id: decodedToken._id });
    if (user.length !== 0) {
      console.log("token here : ", token);
      res.send(user);
    } else {
      console.log(req.cookies);
      res.status(404).send("User Not Found");
    }
  } catch (err) {
    res.status(404).send("something went wrong " + err.message);
  }
});

app.post("/sendConnectionReq", userAuth, (req, res) => {
  const user = req.user;

  console.log("sending the connection");

  res.send(user.name + " is sent the connection request");
});

connectDb()
  .then(() => {
    console.log("Database connection is did");
    app.listen(8080, () => {
      console.log("Server Started");
    });
  })
  .catch((err) => console.error("Got a db error"));
