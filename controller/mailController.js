const nodemailer = require("nodemailer");

const mailController = async (req, res) => {
  //Destructuring User Details
  let { firstName, lastName, email, phoneNumber, gender, course, message } =
    req.body;
  try {
    //Configuring Mail Settings
    let transporter = nodemailer.createTransport({
      service: "Outlook365",
      auth: {
        user: "info@dreamtechlabs.net",
        pass: "",
      },
    });
    if (message) {
      await transporter.sendMail({
        //Sending Contact Mail
        from: '"Dreamtech Labs Academy" <info@dreamtechlabs.net>',
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
      `,
      });
    } else {
      await transporter.sendMail({
        //Sending Register Mail
        from: '"Dreamtech Labs Academy" <info@dreamtechlabs.net>',
        to: "info@dreamtechlabs.net, info@dreamtechlabs.net",
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
      await transporter.sendMail({
        //Sending Contact Mail
        from: '"Dreamtech Labs Academy" <info@dreamtechlabs.net>',
        to: `${email}, ${email}`,
        subject: "Successful Registration",
        html: `
        <center>
        <h2 style="color: green">Successful Application 👩‍💻</h2>
        </center>
        <b>Hi ${firstName}</b>
        <center>
        <p>Congrats, you have successfully applied for the Dreamtech Labs Academy ${course},</p> 
        <p>And over the course of this bootcamp you will learn the fundamental and core concepts needed to become a Full Stack Developer</p>   
        <p>Our team of experienced Web technologists stand ready to work personally with you to ensure you have a great experience in the course</p>
        <p>We will let you know when your application have been completed.</p>
        <p>Thanks!</p>
        <p>Dreamtech lab team 🚀</p>
        <br>
        </center>
        <i>Alone we might go faster</i>
        <i>together we go farther!</i>
        <br>
        <center>
        <p>Have a question about Dreamtech Labs Academy training?</p>
        <a href="https://calendly.com/dreamtechlabsacademy/30min">Schedule a Meeting</a>
        </center>
        <br>
        <center>
        <p>Copyright &copy; 2022 Dreamtech Labs Academy</p>
        </center>
      `,
      });
    }
    res.status(200).json("success");
  } catch (error) {
    console.log(error);
    res.status(500).json("Error");
  }
};
module.exports = mailController;
