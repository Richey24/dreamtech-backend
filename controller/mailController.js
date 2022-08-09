const nodemailer = require("nodemailer");
const dotenv = require("dotenv");

dotenv.config({ path: "./.env" });

const mailController = async (req, res) => {
  //Destructuring User Details
  let {
    firstName,
    lastName,
    email,
    gender,
    course,
    message,
    name,
    score,
    total,
    phoneNumber,
    quizCourse,
    htmlScore,
    cssScore,
    jsScore,
  } = req.body;

  if (!email) {
    res.status(401).json({ message: "No email" });
    return;
  }

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
        to: `uahomorejoice@gmail.com, uahomorejoice@gmail.com`,
        subject: "New Student Quiz Result",
        html: `
        <center>
        <h2 style="color: green">Quiz Result For ${name} 👩‍💻</h2>
        </center>
        <center>
        <p>${name} have successfully completed the quiz for the Dreamtech Academy ,</p> 
        <p>${name} answered ${score}/${total} questions correctly</p>   
        <p>Other Student Information</p>
        <p>Email: ${email}</p>
        <p>HTML Score: ${htmlScore}/15</p>
        <p>Css Score: ${cssScore}/6</p>
        <p>Javascript Score: ${jsScore}/15</p>
         <p>Recommended course: ${
           parseInt((score / total) * 100) < 50
             ? "Full-Stack Web Development Coding Bootcamp 0"
             : parseInt((score / total) * 100) >= 75
             ? "Full-Stack Web Development Coding Bootcamp 2"
             : "Full-Stack Web Development Coding Bootcamp 1"
         }</p> 
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
        <h2 style="color: green">Dear${name} 👩‍💻</h2>
        </center>
        <center>
        <p>We have received the final scores for the</p>
        <p>Dreamtech Academy full stack developer exam</p>
        <p>and, you earned a score of ${score}/${total}</p>
        <p>Based on your score, we recommend that you begin</p>
        <p>your journey with ${
          parseInt((score / total) * 100) < 50
            ? "Full-Stack Web Development Coding Bootcamp 0"
            : parseInt((score / total) * 100) >= 75
            ? "Full-Stack Web Development Coding Bootcamp 2"
            : "Full-Stack Web Development Coding Bootcamp 1"
        }</p>
        <p>One of our advisors will reach out to you</p>
        <p>within the next five (5) business days</p>
        <p>to further discuss this result.</p>
        <p>We are hopeful that we can work</p>
        <p>together toward your success.</p>
        <br>
        <p>You have the option to retake this exam on ${new Date(
          new Date().getTime() + 7 * 24 * 60 * 60 * 1000
        ).toLocaleDateString()}</p>
        <p>We will discuss this option further in our meeting.</p>
        <p>Thank you for your interest in studying with us.</p>
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
