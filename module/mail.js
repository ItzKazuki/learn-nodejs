const config = require('../config/mail.config');
const nodemailer = require('nodemailer');

const transporter = nodemailer.createTransport({
    host: config.HOST,
    port: config.PORT,
    secure: true,
    auth: {
        user: config.USERNAME,
        pass: config.PASSWORD
    }
});

async function sendMail(to, subject, message) {
    const mailOptions = {
        from: config.FROM, // Sender address
        to: to, // List of recipients
        subject: subject, // Subject line
        text: message, // Plain text body
    };

    await transporter.sendMail(mailOptions);
};

module.exports = {
    sendMail,
};