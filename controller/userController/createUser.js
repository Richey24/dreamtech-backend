const { User } = require("../../schema");
const argon2 = require("argon2");

const createUserController = async (req, res) => {
  const { firstname, email, mypassword } = req.body;
  if (!firstname || !email || !mypassword) {
    res
      .status(203)
      .json({ message: "please send all the required information" });
    return;
  }
  const check = await User.findOne({ email });
  if (check) {
    res.status(201).json({ message: "user with this email already exists" });
    return;
  }
  let hashPass = await argon2.hash(mypassword);
  console.log(req.body);
  req.body.password = hashPass;
  console.log(req.body);
  const user = await User.create(req.body);
  const { password, ...mainUser } = user._doc;
  res.status(200).json({ status: true, mainUser });
};

module.exports = createUserController;
