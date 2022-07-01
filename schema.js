const mongoose = require("mongoose");

const User = mongoose.model(
  "User",
  new mongoose.Schema({
    firstname: {
      type: String,
      required: true,
    },
    lastname: {
      type: String,
      required: false,
    },
    email: {
      type: String,
      required: true,
    },
    gender: {
      type: String,
      required: false,
    },
    phone: {
      type: String,
      required: false,
    },
    course: {
      type: String,
      required: false,
    },
  }),
  "user"
);

const Questions = mongoose.model(
  "questions",
  new mongoose.Schema({
    question: {
      type: String,
      required: true,
    },
    answer: {
      type: String,
      required: true,
    },
    isCorrect: {
      type: Boolean,
      required: false,
    },
    userEmail: {
      type: Boolean,
      required: false,
    },
  }),
  "questions"
);

module.exports = {
  User,
  Questions,
};
