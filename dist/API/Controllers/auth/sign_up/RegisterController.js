"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.RegisterHandler = void 0;
const UserModel_1 = require("../../../Models/UserModel");
const bcrypt = __importStar(require("bcrypt"));
require("dotenv/config");
const generateOTP_1 = require("../../../../Services/generateOTP");
const sendEmail_1 = require("../../../../Services/sendEmail");
const OtpEmailStructures_1 = require("../../../../Services/htmlEmailStructures/OtpEmailStructures");
const OtpModel_1 = require("../../../Models/OtpModel");
const generateToken_1 = require("../../../../Services/generateToken");
const main_1 = require("../../../Exceptions/main");
const badRequest_1 = require("../../../Exceptions/badRequest");
const Messages_1 = require("../../../../Services/responses/Messages");
const ErrorTemplate_1 = require("../../../../Services/responses/ErrorTemplate");
async function RegisterHandler(req, res, next) {
    const registerBody = req.body;
    //check if user already exist 
    const userTarget = await (0, UserModel_1.findUserBy)({ email: registerBody.email });
    if (userTarget) {
        return res.status(main_1.ResStatus.BAD_REQUEST).json((0, ErrorTemplate_1.errorResponseTemplate)(new badRequest_1.BadRequestException(Messages_1.Messages.USER_EXIST, main_1.ErrorCode.USER_ALREADY_EXIST, { isUserSaved: false })));
    }
    //
    //if password amd repeated password not the same
    if (registerBody.password != registerBody.repeatPassword) {
        return res.status(main_1.ResStatus.BAD_REQUEST).json((0, ErrorTemplate_1.errorResponseTemplate)(new badRequest_1.BadRequestException(Messages_1.Messages.PASS_NOT_R_PASS, main_1.ErrorCode.PASSWORD_NOT_REPEATED_PASSWORD, { isUserSaved: false })));
    }
    //
    //add this user to database
    //hash password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(registerBody.password, salt);
    //
    const newUser = {
        email: registerBody.email,
        fullName: registerBody.fullName,
        password: hashedPassword
    };
    const user = await (0, UserModel_1.addUser)(newUser);
    //
    //the user form returned according to the frontent desire
    let userReturnedToFront = {
        email: user?.email,
        emailActivated: user?.emailActivated,
        createdAt: user?.createdAt,
        fullName: user?.fullName,
        phone: user?.phone
    };
    //
    //send otp and save it in the database
    //generate a random Otp from 4 numbers
    const otpServer = (0, generateOTP_1.generateOTP)(4);
    //
    //create token to control the validtion time of the otp
    const validtionPeriod = (0, generateToken_1.generateToken)({}, "5m");
    //
    //save it
    const newOtp = await (0, OtpModel_1.addNewOtp)({
        email: registerBody.email,
        code: otpServer,
        expiredAt: validtionPeriod
    });
    //
    //send it
    const success = await (0, sendEmail_1.sendEmail)({
        from: process.env.OWNER_USER_APP,
        to: registerBody.email,
        subject: "Verify your email",
        text: "Verify your email",
        html: (0, OtpEmailStructures_1.OtpEmailStructure)(otpServer, "5")
    }, res);
    //
    //
    if (!success) {
        return res.status(main_1.ResStatus.SOURCE_CREATED).json({
            message: Messages_1.Messages.USER_SAVED,
            isUserSaved: true,
            user: userReturnedToFront,
            Otp: {
                isOtpSent: success,
                message: Messages_1.Messages.NOT_ABLE_SEND_EMAIL
            }
        });
    }
    return res.status(main_1.ResStatus.SOURCE_CREATED).json({
        message: Messages_1.Messages.USER_SAVED,
        isUserSaved: true,
        user: userReturnedToFront,
        Otp: {
            isOtpSent: success,
            keyVal: newOtp.id
        }
    });
}
exports.RegisterHandler = RegisterHandler;
