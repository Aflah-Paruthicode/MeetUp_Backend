
const express = require("express");
const { userAuth } = require("../middlewares/auth");
const proffileRouter = express.Router();


proffileRouter.get("/proffile", userAuth, async (req, res) => {
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

module.exports = proffileRouter;
