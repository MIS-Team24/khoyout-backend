"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.sendEmail = void 0;
const nodemailer_1 = require("./nodemailer");
const sendEmail = async (mailOptions, res) => {
    await nodemailer_1.transporter.sendMail(mailOptions, (error, info) => {
        if (error)
            res.status(400).json({ success: false, details: error });
    });
    return true;
};
exports.sendEmail = sendEmail;
/*
    example for mailOption object here
    {
        from    :   process.env.OWNER_USER_APP,
        to      :   user_email,
        subject :  "verify your email",
        text    :  `please inter this otp to verify your email ${otpServer}`,
        html    :  <h1>Welcome to our service</h1>
    }
*/ 
