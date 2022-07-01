const mongoose = require("mongoose");
const express = require("express");
const dotenv = require("dotenv");
const getAllUserController = require("./controller/userController/getAllUsers");
const createUserController = require("./controller/userController/createUser");
const saveQuestionController = require("./controller/questionsController/create");
const getAllQuestionsController = require("./controller/questionsController/getAll");
const editOneQuestionController = require("./controller/questionsController/editOne");
const cors = require("cors");
const mailController = require("./controller/mailController");
const app = express();

//dotenv
dotenv.config({ path: "./.env" });
app.use(cors());
app.use(express.json());
const port = process.env.PORT || 5000;

const url =
  "mongodb+srv://richey:Rejoice11@cluster0.uq2iuaj.mongodb.net/dreamtechlabs?retryWrites=true&w=majority";

const start = () => {
  try {
    mongoose.connect(url, {
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
  .post("/register", createUserController,mailController);

const questionsRouter = express.Router();
questionsRouter
  .post("/save", saveQuestionController)
  .put("/update/:id", editOneQuestionController)
  .get("/get/all", getAllQuestionsController);

app.use("/questions", questionsRouter);
app.use("/user", userRouter);
