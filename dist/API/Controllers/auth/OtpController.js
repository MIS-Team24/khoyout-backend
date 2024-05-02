"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.OtpSentToEmailHandler = void 0;
const generateOTP_1 = require("../../../Services/generateOTP");
const sendEmail_1 = require("../../../Services/sendEmail");
const UserModel_1 = require("../../Models/UserModel");
//recieve the email target to send and email
async function OtpSentToEmailHandler(req, res) {
    const registerBody = req.body;
    //check if user already exist 
    const userExistence = await (0, UserModel_1.isUserExist)(registerBody.email);
    if (userExistence)
        res.json({ error: "This user is already exist" });
    //
    //generate a random Otp from 4 numbers
    const otpServer = (0, generateOTP_1.generateOTP)(4);
    //
    //send email
    const result = (0, sendEmail_1.sendEmail)({
        from: process.env.OWNER_USER_APP,
        to: registerBody.email,
        subject: "Verify your email",
        text: "Verify your email",
        html: `<h2>Welcome to our service</h2>
                    <p>Please, inter this otp to verify your email.</p>
                    <h1>${otpServer}</h1>`
    });
    //
    res.json(result);
}
exports.OtpSentToEmailHandler = OtpSentToEmailHandler;
