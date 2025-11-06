const express = require("express");

const app = express();

app.use("/proffile", (req, res) => {
  res.send("hai dude , wanna edit anything?");
}); 

app.use("/ha", (req, res) => {
  res.send("hai from home");
});


app.listen(8080, () => {
  console.log("Server Started");
});
