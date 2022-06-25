const { Questions } = require("../../schema");

const editOneRoomController = async (req, res) => {
  // if (req.user) {
  const { id } = req.params;
  try {
    let questions = await Questions.findOneAndUpdate(
      id,
      {...req.body},
      { new: true }
    );
    res.status(200).json({ status: true, message: "Update!", questions });
  } catch (err) {
    res.status(404).json({ status: false, message: err });
  }
  // } else {
  // res.status(401).json({ status: false, message: "unauthorized access" });
  // }
};

module.exports = editOneRoomController;
