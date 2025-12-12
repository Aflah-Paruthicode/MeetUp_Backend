const express = require("express");
const { userAuth } = require("../middlewares/auth");
const ConnectionRequest = require("../model/connectionRequest");
const userRouter = express.Router();
const UserSafeData = [
  "firstName",
  "lastName",
  "photoUrl",
  "about",
  "gender",
  "skills",
];

userRouter("/user/requests/received", userAuth, async (req, res) => {
  try {
    const loggedInUser = req.user;
    const connectionRequests = await ConnectionRequest.find({
      toUserId: loggedInUser._id,
      status: "interested",
    }).populate("fromUserId", UserSafeData);
    res.json({
      message: "Data fetched successfully",
      data: connectionRequests,
    });
  } catch (err) {
    res.status(400).send("ERROR: " + err.message);
  }
});

userRouter.get("/user/connections", userAuth, async (req, res) => {
  try {
    const loggedInUser = req.user;

    const connectionRequests = ConnectionRequest.find({
      $or: [
        { toUserId: loggedInUser._id, status: "accepted" },
        { fromUserId: loggedInUser._id, status: "accepted" },
      ],
    })
      .populate("fromUserId", UserSafeData)
      .populate("toUserId", UserSafeData);

    const data = connectionRequests.map((row) => { 
      if (row.fromUserId._id.toString() == loggedInUser._id.toString()) {
        return row.toUserId;
      } else {
        row.fromUserId;
      }
    });

    res.json({ message: " Connections ", data: data });
  } catch (err) {
    res.status(400).send("ERR: " + err.message);
  }
});

module.exports = {
  userRouter,
};
