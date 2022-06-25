const { Questions } = require("../../schema");

const saveQuestionController = async (req, res) => {
  const { question, answer, isCorrect } = req.body;
    try {
      let quest = await Questions.create({ question, answer, isCorrect });
      res
        .status(200)
        .json({ status: true, message: "Saved question", question:quest });
    } catch (err) {
      res.status(400).json({ status: false, message: err });
    }
};

module.exports = saveQuestionController;
