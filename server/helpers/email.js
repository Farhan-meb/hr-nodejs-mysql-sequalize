const nodemailer = require('nodemailer');
const config = require('../config');

const sendEmail = async function (to, subject, text) {
    return new Promise((resolve, reject) => {
        const transporter = nodemailer.createTransport({
            host: config.mail.host,
            port: config.mail.port,
            auth: {
                user: config.mail.auth.user,
                pass: config.mail.auth.pass,
            },
        });

        const mailOptions = {
            from: config.mail.from,
            to: to,
            subject: subject,
            text: text,
        };

        transporter.sendMail(mailOptions, function (error, info) {
            if (error) {
                resolve(false);
            } else {
                resolve(true);
            }
        });
    });
};

module.exports = { sendEmail };
