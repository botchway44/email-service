require("dotenv").config();
import { MailerService } from './mailer.service';

const express = require('express');
const server = express();
const path = require("path");
const bodyParser = require('body-parser');


server.use(bodyParser.json());
server.use(bodyParser.urlencoded({ extended: false }));
server.use(express.static(path.join(__dirname, "../../.")));


let mailService: MailerService;


server.get('/api/mail', async (req: any, res: any) => {
  mailService.sendConfirmationEmail("noelnuel44@gmail.com");

  return res.status(200).send("Email Sent");
});




const PORT = process.env.PORT || 9000;

server.listen(PORT, () => {
  mailService = new MailerService();

  console.log("App is running on port 🚀" + PORT);
  console.log('Listening for conversations ... on port ', PORT);
});


