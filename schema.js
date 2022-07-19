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
    password: {
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
    testDate: {
      type: Number,
      required: false,
    },
  }),
  "user"
);

module.exports = {
  User,
};
