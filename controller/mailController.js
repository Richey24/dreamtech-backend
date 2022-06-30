const nodemailer = require("nodemailer");

const mailController = async (req, res) => {
  //Destructuring User Details
  let {
    firstName,
    lastName,
    email,
    phone: phoneNumber,
    gender,
    course,
    message
  } = req.body;
  try {
    //Configuring Mail Settings
    let transporter = nodemailer.createTransport({
      host: "smtp.gmail.com",
      port: 465,
      secure: true,
      auth: {
        user: "uahomorejoice@gmail.com",
        pass: "",
      },
    });

    if (message) {
      await transporter.sendMail({
        //Sending Contact Mail
        from: '"Dreamtech Academy" <info@dreamtechlab.com>',
        to: "uahomorejoice@gmail.com, uahomorejoice@gmail.com",
        subject: "New Contact Message",
        html: `
        <h4>New Contact Message</h4>
        Firstname - <b>${firstName}</b>
        <br>
        Lastname - <b>${lastName}</b>
        <br>
        Email - <b>${email}</b>
        <br>
        Phone - <b>${phoneNumber}</b>
        <br>
        Message - <b>${message}</b>
        <br>
      `,
      });
    } else {
      await transporter.sendMail({
        //Sending Register Mail
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
    }
    res.status(200).json({ message: "success", });
  } catch (error) {
    console.log(error);
    res.status(500).json("Error");
  }
};
module.exports = mailController;
