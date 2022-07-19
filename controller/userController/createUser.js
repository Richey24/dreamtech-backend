const { User } = require("../../schema");
const argon2 = require("argon2");

const createUserController = async (req, res) => {
  const { firstname, email, password } = req.body;
  if (!firstname || !email || !password) return;
  const check = await User.findOne({ email });
  if (check) {
    res.status(201).json({ message: "user with this email already exists" });
    return;
  }
  if (firstname) {
    try {
      let hashPass = await argon2.hash(password);
      req.body.password = hashPass;
      console.log(req.body);
      const user = await User.create(req.body);
      const { password, ...mainUser } = user._doc;
      res.status(200).json({ status: true, mainUser });
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
