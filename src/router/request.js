
const express = require("express");
const { userAuth } = require("../middlewares/auth");
const requestRouter = express.Router();


requestRouter.post("/sendConnectionReq", userAuth, (req, res) => {
  const user = req.user;

  console.log("sending the connection");

  res.send(user.name + " is sent the connection request");
});

module.exports = requestRouter;
