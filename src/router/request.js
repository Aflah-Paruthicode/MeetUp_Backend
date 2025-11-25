const express = require("express");
const { userAuth } = require("../middlewares/auth");
const ConnectionRequest = require("../model/connectionRequest");
const requestRouter = express.Router();
const User = require("../model/user");

requestRouter.post(
  "/sendConnectionReq/:toUserId/:status",
  userAuth,
  async (req, res) => {
    const fromUserId = req.user._id;
    const toUserId = req.params.toUserId;
    const status = req.params.status;

    try {

      if (fromUserId == toUserId)
        throw new Error("Cannot send request to yourself");

      const toUser = await User.findOne({ _id: toUserId });
      if (!toUser) return res.status(400).json({ message: "user not found !" });

      const existingConnectionRequest = await ConnectionRequest.findOne({
        $or: [
          { fromUserId, toUserId },
          { fromUserId: toUserId, toUserId: fromUserId },
        ],
      });

      if (existingConnectionRequest)
        return res
          .status(400)
          .send(
            "Connection Request already present : " + existingConnectionRequest
          );

      const allowedStatus = ["ignored", "interested"];
      if (!allowedStatus.includes(status)) {
        return res
          .status(400)
          .json({ message: "invalid status type + ", status });
      }

      const request = new ConnectionRequest({
        fromUserId,
        toUserId,
        status,
      });

      const data = await request.save();
      res.send(toUser.name + " is sent the connection request" + data);
    } catch (err) {
      res.status(200).send("Error in request send - " + err.message);
    }
  }
);

module.exports = requestRouter;
