const mongoose = require("mongoose");

const User = mongoose.model(
  "Student",
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
    password: {
      type: String,
      required: true,
    },
    phoneNumber: {
      type: String,
      required: false,
    },
    course: {
      type: String,
      required: false,
    },
    testDate: {
      type: Number,
      required: false,
    },
  }),
  "student"
);

module.exports = {
  User,
};
