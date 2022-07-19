const { User } = require("../../schema");
const argon2 = require("argon2");

const loginUser = async (req, res) => {
  const { email, password } = req.body;
  if (!email || !password) return;
  try {
    const user = await User.findOne({ email: email });
    if (user) {
      const verify = await argon2.verify(user.password, password);
      if (verify) {
        const { password, ...mainUser } = user._doc;
        if (user.testDate) {
          let date = new Date().getTime();
          if (date >= user.testDate) {
            res.status(200).json(mainUser);
          } else {
            res
              .status(401)
              .json({
                message:
                  "Kindly wait till a week after your previous test to take another test",
              });
          }
        } else {
          res.status(200).json(mainUser);
        }
      } else {
        res.status(203).json({ message: "Invalid Password" });
      }
    } else {
      res.status(404).json({ message: "No User Found With This Email" });
    }
  } catch (error) {
    res.status(500).json(error);
  }
};

module.exports = loginUser;
