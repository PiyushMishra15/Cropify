const nodemailer = require("nodemailer");
const ejs = require("ejs");
const path = require("path");

const sendEmail = async (options) => {
  const transporter = nodemailer.createTransport({
    host: process.env.EMAIL_HOST,
    port: process.env.EMAIL_PORT,
    auth: {
      user: process.env.EMAIL_USERNAME,
      pass: process.env.EMAIL_PASSWORD,
    },
  });

  // Dynamically render EJS template
  const html = await ejs.renderFile(
    path.join(__dirname, `../views/${options.template}.ejs`),
    options.templateData
  );

  const mailOptions = {
    from: process.env.EMAIL_FROM,
    to: options.email,
    subject: options.subject,
    html,
    text: options.message, // fallback
  };

  await transporter.sendMail(mailOptions);
};

module.exports = sendEmail;
