import nodeMailer from 'nodemailer';

import MailGen from 'mailgen';

import { config } from '../config.js';

let nodeConfig = {
  host: 'smtp.ethereal.email',
  port: 587,
  secure: false, // Use `true` for port 465, `false` for all other ports
  auth: {
    user: config.Email,
    pass: config.password,
  },
};

let transPorter = nodeMailer.createTransport(nodeConfig);
let MailGenetor = new MailGen({
  theme: 'default',
  product: {
    // Appears in header & footer of e-mails
    name: 'Mailgen',
    link: 'https://mailgen.js/',
    // Optional product logo
    // logo: 'https://mailgen.js/img/logo.png'
  },
});

export const registerMail = async (req, res) => {
  const { username, userEmail, text, subject } = req.body;

  var email = {
    body: {
      namee: username,
      intro: text || 'Welcome to ',
      outro: 'Need help',
    },
  };

  var emailBody = MailGenetor.generate(email);

  let message = {
    from: config.Email,
    to: userEmail,
    subject: subject || 'Signup Succesfull',
    html: emailBody,
  };

  transPorter
    .sendMail(message)
    .then(() => {
      return res.status(200).send({ msg: 'You should receive an email' });
    })
    .catch((err) => {
      return res.status(500).send({ err });
    });
};
