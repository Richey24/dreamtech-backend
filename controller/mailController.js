const nodemailer = require("nodemailer");

const mailController = async (req, res) => {
  let { firstName, lastName, email, phoneNumber, gender, course } = req.body;
  try {
    let transporter = nodemailer.createTransport({
      host: "smtp.gmail.com",
      port: 465,
      secure: true,
      auth: {
        user: "uahomorejoice@gmail.com",
        pass: "",
      },
    });

    let info = await transporter.sendMail({
      from: '"Dreamtech Academy" <info@dreamtechlab.com>',
      to: "uahomorejoice@gmail.com, uahomorejoice@gmail.com",
      subject: "New Student Registration",
      html: `
        <h4>New Student Registration</h4>
        Firstname - <b>${firstName}</b>
        <br>
        Lastname - <b>${lastName}</b>
        <br>
        Email - <b>${email}</b>
        <br>
        Phone - <b>${phoneNumber}</b>
        <br>
        Gender - <b>${gender}</b>
        <br>
        Course - <b>${course}</b>
      `,
    });
    console.log("Message sent: %s", info.messageId);
  } catch (error) {
    console.log(error);
  }
};
module.exports = mailController;
