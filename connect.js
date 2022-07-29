const mongoose = require("mongoose");
const express = require("express");
const dotenv = require("dotenv");
const getAllUserController = require("./controller/userController/getAllUsers");
const createUserController = require("./controller/userController/createUser");
const cors = require("cors");
const mailController = require("./controller/mailController");
const loginUser = require("./controller/userController/loginUser");
const testDate = require("./controller/userController/testDate");
const app = express();
//dotenv
dotenv.config({ path: "./environ/.env" });
app.use(cors());
app.use(express.json());
const port = process.env.PORT || 5000;

const start = () => {
  try {
    mongoose.connect(process.env.MONGODB_URL, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    app.listen(port, () => console.log(`listening at ${port}`));
  } catch (error) {
    console.log(error);
  }
};

start();

app.get("/", (req, res) => res.send("hello"));
app.post("/send/mail", mailController);

const userRouter = express.Router();
userRouter
  .get("/get/all", getAllUserController)
  .post("/register", createUserController)
  .post("/login", loginUser)
  .post("/date", testDate);

app.use("/user", userRouter);
