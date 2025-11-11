
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

app.get('/users', async (req,res) => { 
  const name = req.body.name;
  try {
    const users = await User.find({name : name});
    if(users.length !== 0) { 
      res.send(users)
    } else { 
      res.status(404).send('User Not Found')
    }
  } catch (err) { 
    res.status(404).send('something went wrong '+err.message)
  }
})

app.get('/feed', async (req,res) => { 

  try { 
    const users = await User.find({});
    res.send(users)
  } catch (error) { 
    res.status(404).send('something went wrong')
  }
})

connectDb()
  .then(() => { 
    console.log("Database connection is did");
    app.listen(8080, () => {
      console.log("Server Started");
    });
  })
  .catch((err) => console.error("Got a db error"));
