
const nodemailer = require('nodemailer');
const hbs = require("nodemailer-express-handlebars");
require("dotenv").config();

module.exports =  class MailerService {

  mailTransporter;

  constructor() {
    this.mailTransporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: process.env.GMAIL,
        pass: process.env.GMAIL_PASS
      }
    });

    const options = {
      viewEngine: {
        partialsDir: __dirname + "/assets/templates",
        layoutsDir: __dirname + "/assets/templates/layouts",
        defaultLayout: "main",
        extname: ".hbs"
      },
      extName: ".hbs",
      viewPath: "assets/templates"
    };

    this.mailTransporter.use("compile", hbs(options));
  }

  sendConfirmationEmail(email) {


    const mailOptions = {
      from: `"Nana Adwoa" <${process.env.GMAIL}>`,
      to: `${email}`,
      subject: `Hey, here's your PIN`,
      template: "test",
      context: {},
    };

    this.mailTransporter.sendMail(mailOptions, (error, info) => {
      console.log("Sending Emails:::");
      if (error) {
        return console.log(error);
      }
      console.log('Message sent: %s', info);
    });
  }

}