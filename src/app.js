const express = require("express");
const { connectDb } = require("./config/database");
const app = express();
const cookieParser = require("cookie-parser");
const cors = require('cors')

app.use(
  cors({
    origin: "http://localhost:5173",
    methods: ["GET", "POST", "PUT", "PATCH", "DELETE","OPTIONS"],
    credentials: true,
  })
);

app.use(express.json());
app.use(cookieParser());

const authRouter = require("./router/auth");
const proffileRouter = require("./router/proffile");
const requestRouter = require("./router/request");
const userRouter = require("./router/user");

app.use("/", authRouter);
app.use("/", proffileRouter); 
app.use("/", requestRouter);
app.use("/", userRouter);

connectDb()
  .then(() => {
    console.log("Database connection is did"); 
    app.listen(8080, () => {
      console.log("Server Started");
    });
  })
  .catch((err) => console.error("Got a db error"));
