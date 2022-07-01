const { User } = require("../../schema");

const createUserController = async (req, res, next) => {
  const { firstname, email } = req.body;
  console.log(req.body);
  const check = await User.findOne({ email });
  if (check) {
    res.status(201).json({ message: "user with this email already exists" });
    return;
  }
  if (firstname) {
    try {
      const user = await User.create(req.body);
      res.status(200).json({ status: true, user });
    } catch (err) {
      res.status(200).json({ status: false, err });
    }
  } else {
    res
      .status(203)
      .json({ message: "please send all the required information" });
  }
};

module.exports = createUserController;
