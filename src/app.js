const express = require("express");
const { connectDb } = require("./config/database");
const app = express();
const cookieParser = require("cookie-parser");

app.use(express.json());
app.use(cookieParser());

const authRouter = require("./router/auth");
const proffileRouter = require("./router/proffile");
const requestRouter = require("./router/request");

app.use("/", authRouter);
app.use("/", proffileRouter);
app.use("/", requestRouter);

connectDb()
  .then(() => {
    console.log("Database connection is did");
    app.listen(8080, () => {
      console.log("Server Started"); 
    });
  })
  .catch((err) => console.error("Got a db error"));
