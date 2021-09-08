const nodemailer = require("nodemailer");

// create reusable transporter object using the default SMTP transport
var transporter = nodemailer.createTransport({
  host: process.env.MAIL_HOST,
  port: process.env.MAIL_PORT,
  auth: {
    user: process.env.MAIL_USER,
    pass: process.env.MAIL_PASSWORD,
  },
});

const sendMail = async (to, data) => {
  // send mail with defined transport object
  await transporter.sendMail({
    from: process.env.MAIL_FROM, // sender address
    to: to, // list of receivers
    subject: data.subject, // Subject line
    text: data.text, // plain text body
    html: data.html, // html body
  });
};

module.exports = { sendMail };
