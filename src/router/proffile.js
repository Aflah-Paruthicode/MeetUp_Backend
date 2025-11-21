
const express = require("express");
const { userAuth } = require("../middlewares/auth");
const { validateEditProffile } = require("../utils/validation");
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

module.exports = proffileRouter;
