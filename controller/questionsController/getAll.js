const { Questions } = require("../../schema");

const getAllQuestionsController = async (req, res) => {
  try {
    let questions = await Questions.find();
    res
      .status(200)
      .json({ status: true, message: "Successfully Fetched!", questions });
  } catch (err) {
    res.status(400).json({ status: false, message: err });
  }
};

module.exports = getAllQuestionsController;
