const express = require("express");
const { userAuth } = require("../middlewares/auth");
const ConnectionRequest = require("../model/connectionRequest");
const User = require("../model/user");
const userRouter = express.Router();
const UserSafeData = [
  "firstName",
  "lastName",
  "photoUrl",
  "about",
  "gender",
  "skills",
];

// userRouter("/user/requests/received", userAuth, async (req, res) => {
//   try {
//     const loggedInUser = req.user;
//     const connectionRequests = await ConnectionRequest.find({
//       toUserId: loggedInUser._id,
//       status: "interested",
//     }).populate("fromUserId", UserSafeData);
//     res.json({
//       message: "Data fetched successfully",
//       data: connectionRequests,
//     });
//   } catch (err) {
//     res.status(400).send("ERROR: " + err.message);
//   }
// });
 
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

userRouter.get("/feed", userAuth, async (req, res) => {
  try {
    //  do not see the interested or ignored people again,
    //  do not see the person who already connected,
    //  do not see their own proffile here.

    const page = parseInt(req.query.page) || 1;
    let limit = parseInt(req.query.limit) || 10;
    if(limit > 50) limit = 50;
    const skip = (page -1) * limit;

    const loggedInUser = req.user;

    const connectionRequests = await ConnectionRequest.find({
      $or: [{ fromUserId: loggedInUser._id }, { toUserId: loggedInUser._id }],
    }).select("fromUserId toUserId");

    const hideUsersFromFeed = new Set();
    connectionRequests.forEach((req) => {
      hideUsersFromFeed.add(req.fromUserId.toString());
      hideUsersFromFeed.add(req.toUserId.toString());
    });

    const users = await User.find({
      $and: [
        { _id: { $nin: Array.from(hideUsersFromFeed) } },
        { _id: { $ne: loggedInUser._id}}
      ],
    }).select(UserSafeData);
 
    res.json({data : users});
  } catch (err) {
    res.status(400).send("ERROR - " + err.message);
  }
});

module.exports = userRouter
