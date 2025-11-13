const express = require("express");
const { connectDb } = require("./config/database");
const User = require("./model/user");
const app = express();

app.use(express.json());

app.post("/signup", async (req, res) => {
  console.log(req.body);

  try {
    const { email } = req.body;
    const isEmailUnique = await User.find({ email: email });
    if (isEmailUnique.length !== 0) {
      res.status(404).send("Email Already Exists");
    } else {
      const user = new User(req.body);
      await user.save();
      res.send("Document added successfull");
    }
  } catch (error) {
    res.status(400).send("Error Occured In Adding Doc - "+ error.message);
  }
});

app.get("/users", async (req, res) => {
  const name = req.body.name;
  try {
    const users = await User.find({ name: name });
    if (users.length !== 0) {
      res.send(users);
    } else {
      res.status(404).send("User Not Found");
    }
  } catch (err) {
    res.status(404).send("something went wrong " + err.message);
  }
});

app.get("/feed", async (req, res) => {
  try {
    const users = await User.find({});
    res.send(users);
  } catch (error) {
    res.status(404).send("something went wrong");
  }
});

app.delete("/user", async (req, res) => {
  const id = req.body.id;
  try {
    const user = await User.findByIdAndDelete({ _id: id });
    res.status(200).send(user);
  } catch (err) {
    res.status(404).send("Something Went Wrong");
  }
});

app.patch("/user", async (req, res) => {
  const userId = req.body.id;
  const data = req.body;

  try {
    const user = await User.findByIdAndUpdate({ _id: userId }, data,{runValidators:true});
    res.status(200).send("User Updated Successfull", user);
  } catch (error) {
    res.status(404).send("Something Went Wrong");
  }
});

connectDb()
  .then(() => {
    console.log("Database connection is did");
    app.listen(8080, () => {
      console.log("Server Started");
    });
  })
  .catch((err) => console.error("Got a db error"));
