const app = require('express').Router();
const nodemailer = require('nodemailer');
require('dotenv').config();

const sendMail = (receiver, authCode, resp) => {
    const transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: process.env.NODEMAILER_USER,
            pass: process.env.NODEMAILER_PASS
        }
    });

    // const htmlContent = fs.readFileSync(path.join(__dirname, '..', '..', 'views', 'auth-mail-content.html'));

    const mailOptions = {
        from: process.env.NODEMAILER_USER,
        to: receiver,
        subject: '메일 인증',
        text: 'Verification Code: ' + authCode
    };

    if (mailOptions.receiver != null && mailOptions.receiver != undefined) {
        transporter.sendMail(mailOptions, (error, info) => {
            if (error) {
                console.log(error);
            } else {
                resp.status(200).send({ message: 'succeeded' });
            }
        });
    }
};

app.post('/sendmail', (req, resp) => {
    sendMail(req.body.email, req.body.authCode, resp);
});

module.exports = app;