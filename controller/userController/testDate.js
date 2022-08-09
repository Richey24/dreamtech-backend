const { User } = require("../../schema");

const testDate = async (req, res) => {
  const { email } = req.body;
  if (!email) {
    res.status(401).json({ message: "No email" });
    return;
  }
  try {
    const testDate = new Date().getTime() + 7 * 24 * 60 * 60 * 1000;
    const user = await User.findOneAndUpdate(
      { email: email },
      { testDate: testDate },
      {
        new: true,
      }
    );
    res.status(200).json(user);
  } catch (error) {
    res.status(500).json(error);
  }
};

module.exports = testDate;
