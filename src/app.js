
const express = require("express");
const { connectDb } = require("./config/database");
const User = require("./model/user");
const app = express();

app.use(express.json())

app.post("/signup", async (req, res) => { 

  console.log(req.body)
  const user = new User(req.body);

  try { 
    await user.save();
    res.send('Document added successfull')
  } catch (error) {
    res.status(400).send('Error Occured In Adding Doc', error.message);
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
