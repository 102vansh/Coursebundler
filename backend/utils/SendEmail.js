const nodemailer = require('nodemailer');

exports.sendEmail = async (email, subject, text) => {
    var transporter = nodemailer.createTransport({
        host: "sandbox.smtp.mailtrap.io",
        port: 2525,
        auth: {
          user: "93c0a541a9bc5f",
          pass: "********7189"
        }
      });

    await transporter.sendMail({
        from: 'coursebunler@gmail.com', // sender address
        to: email, // list of receivers
        subject: subject, // Subject line
        text: text // plain text body
    });
};
