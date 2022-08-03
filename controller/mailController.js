const nodemailer = require("nodemailer");
const dotenv = require("dotenv");

dotenv.config({ path: "./.env" });

const mailController = async (req, res) => {
  //Destructuring User Details
  let {
    firstName,
    lastName,
    email,
    phone: phoneNumber,
    gender,
    course,
    message,
    name,
    score,
    total,
    phone,
    quizCourse,
  } = req.body;
  try {
    //Configuring Mail Settings
    let transporter = nodemailer.createTransport({
      service: "Outlook365",
      auth: {
        user: "info@dreamtechlabs.net",
        pass: process.env.PASS,
      },
    });
    if (message) {
      await transporter.sendMail({
        //Sending Contact Mail To Admin
        from: '"Dreamtech Labs Academy" <info@dreamtechlabs.net>',
        to: "info@dreamtechlabs.net, info@dreamtechlabs.net",
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
    } else if (score) {
      await transporter.sendMail({
        //Sending Quiz Result Mail To Admin
        from: '"Dreamtech Labs Academy" <info@dreamtechlabs.net>',
        to: `info@dreamtechlabs.net, info@dreamtechlabs.net`,
        subject: "New Student Quiz Result",
        html: `
        <center>
        <h2 style="color: green">Quiz Result For ${name} 👩‍💻</h2>
        </center>
        <center>
        <p>${name} have successfully completed the quiz for the Dreamtech Academy ${quizCourse},</p> 
        <p>${name} answered ${score}/${total} questions correctly</p>   
        <p>Other Student Information</p>
        <p>${email}</p>
        <br>
        <p>Dreamtech lab team 🚀</p>
        <br>
        <i>Alone we might go faster</i>
        <i>together we go farther!</i>
        <br>
        <p>Copyright &copy; 2022 Dreamtech Academy</p>
        </center>
      `,
      });

      await transporter.sendMail({
        //Sending Quiz Result Mail To User
        from: '"Dreamtech Labs Academy" <info@dreamtechlabs.net>',
        to: `${email}, ${email}`,
        subject: "Your Quiz Result",
        html: `
        <center>
        <h2 style="color: green">Quiz Result For ${name} 👩‍💻</h2>
        </center>
        <center>
        <p>Congrats, You have successfully completed the Dreamtech Academy quiz,</p> 
        <p>Based on your result you have qualified for the ${
          parseInt((score / total) * 100) >= 70
            ? "Full-Stack Web Development Coding Bootcamp 2"
            : "Full-Stack Web Development Coding Bootcamp 1"
        }</p>
        <br>
        <p>Dreamtech lab team 🚀</p>
        <br>
        <i>Alone we might go faster</i>
        <i>together we go farther!</i>
        <br>
        <p>Have a question about Dreamtech Academy training?</p>
        <a href="https://calendly.com/dreamtechlabsacademy/30min">Schedule a Meeting</a>
        <br>
        <p>Copyright &copy; 2022 Dreamtech Academy</p>
        </center>
      `,
      });
    } else {
      await transporter.sendMail({
        //Sending Register Mail To Admin
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
        //Sending Confirmation Mail To User
        from: '"Dreamtech Academy" <info@dreamtechlabs.net>',
        to: `${email}, ${email}`,
        subject: "Successful Registration",
        html: `
        <center>
        <h2 style="color: green">Successful Application 👩‍💻</h2>
        </center>
        <b>Hi ${firstName}</b>
        <center>
        <p>Congrats, you have successfully applied for the Dreamtech Academy ${course},</p> 
        <p>And over the course of this bootcamp you will learn the fundamental and core concepts needed to become a Full Stack Developer</p>   
        <p>Our team of experienced Web technologists stand ready to work personally with you to ensure you have a great experience in the course</p>
        <p>We will let you know when your application have been completed.</p>
        <p>Thanks!</p>
        <p>Dreamtech team 🚀</p>
        <br>
        </center>
        <i>Alone we might go faster</i>
        <i>together we go farther!</i>
        <br>
        <center>
        <p>Have a question about Dreamtech Academy training?</p>
        <a href="https://calendly.com/dreamtechlabsacademy/30min">Schedule a Meeting</a>
        </center>
        <br>
        <center>
        <p>Copyright &copy; 2022 Dreamtech Academy</p>
        </center>
      `,
      });
    }
    res.status(200).json({ message: "success" });
  } catch (error) {
    console.log(error);
    res.status(500).json(error);
  }
};
module.exports = mailController;
