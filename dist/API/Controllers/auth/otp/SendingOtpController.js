"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.OtpSentToEmailHandler = void 0;
const generateOTP_1 = require("../../../../Services/generateOTP");
const OtpEmailStructures_1 = require("../../../../Services/htmlEmailStructures/OtpEmailStructures");
const sendEmail_1 = require("../../../../Services/sendEmail");
const OtpModel_1 = require("../../../Models/OtpModel");
const UserModel_1 = require("../../../Models/UserModel");
const generateToken_1 = require("../../../../Services/generateToken");
//recieve the email target to send an otp 
async function OtpSentToEmailHandler(req, res) {
    const emailBody = req.body;
    //check if user already exist 
    const user = await (0, UserModel_1.findUserByEmail)(emailBody.email);
    if (!user)
        res.json({ error: "This user is not exist!" });
    //
    //generate a random Otp from 4 numbers
    const otpServer = (0, generateOTP_1.generateOTP)(4);
    //
    //create token to control the validtion time of the otp
    const validtionPeriod = (0, generateToken_1.generateToken)({}, "5m");
    //
    //save it
    const newOtp = await (0, OtpModel_1.addNewOtp)({
        email: emailBody.email,
        code: otpServer,
        expiredAt: validtionPeriod
    });
    //
    //send email
    const success = await (0, sendEmail_1.sendEmail)({
        from: process.env.OWNER_USER_APP,
        to: emailBody.email,
        subject: "Verify your email",
        text: "Verify your email",
        html: (0, OtpEmailStructures_1.OtpEmailStructure)(otpServer)
    }, res);
    //
    if (!success) {
        res.json({
            Otp: {
                success,
                message: "There something wrong with sending email try later!"
            }
        });
    }
    res.json({
        Otp: {
            success,
            keyVal: newOtp.id
        }
    });
}
exports.OtpSentToEmailHandler = OtpSentToEmailHandler;
