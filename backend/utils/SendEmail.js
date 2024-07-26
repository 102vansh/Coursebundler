const nodemailer = require('nodemailer');

exports.sendEmail = async (email, subject, text) => {
    const transporter = nodemailer.createTransport({
        host: 'smtp.gmail.com',
        port: 587,
        secure: false, // true for 465, false for other ports
        auth: {
            user: 'coursebunler@gmail.com',
            pass: 'coursebunler'
        }
    });

    await transporter.sendMail({
        from: 'coursebunler@gmail.com', // sender address
        to: email, // list of receivers
        subject: subject, // Subject line
        text: text // plain text body
    });
};
