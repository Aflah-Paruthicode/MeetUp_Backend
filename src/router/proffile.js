
const express = require("express");
const { userAuth } = require("../middlewares/auth");
const {
  validateEditProffile,
  validateCurrPassword,
} = require("../utils/validation");
const proffileRouter = express.Router();

proffileRouter.get("/proffile/view", userAuth, async (req, res) => {
  try {
    const user = req.user;
    if (user.length !== 0) {
      res.send(user);
    } else {
      res.status(404).send("User Not Found");
    }
  } catch (err) {
    res.status(404).send("something went wrong " + err.message);
  }
});

proffileRouter.patch("/proffile/edit", userAuth, async (req, res) => {
  try {
    if (!validateEditProffile) {
      throw new Error("Invalid edit request");
    }

    let loggedInUser = req.user;
    Object.keys(req.body).forEach((key) => (loggedInUser[key] = req.body[key]));
    loggedInUser.save();
  } catch (err) {
    res.status(400).send("Error in update proffile - " + err.message);
  }
});

proffileRouter.patch("proffile/password", userAuth, async (req, res) => {
  try {
    if (!validateCurrPassword(req)) throw new Error("invalid password");

    if (!validNewPassword(req))
      throw new Error("The new Password is not strong");

    if (!validNewPassword(req)) throw new Error("New password is not strong");

    const loggedInUser = req.user;
    loggedInUser.save();
    res.status(200).send('password update successfull')
  } catch (err) {
    res.status(400).send("Error in edit password - " + err.message);
  }
});

module.exports = proffileRouter;
