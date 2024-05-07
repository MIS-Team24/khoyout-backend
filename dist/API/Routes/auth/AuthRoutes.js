"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const BodyValidator_1 = __importDefault(require("../../Middleware/BodyValidator"));
const RegisterController_1 = require("../../Controllers/auth/sign_up/RegisterController");
const SendingOtpController_1 = require("../../Controllers/auth/otp/SendingOtpController");
const UserSchema_1 = require("../../../Services/validationSchemas/UserSchema");
const ResetPasswordController_1 = require("../../Controllers/auth/log_in/ResetPasswordController");
const ValidateOtp_1 = require("../../Middleware/ValidateOtp");
const VerifyEmailController_1 = require("../../Controllers/auth/sign_up/VerifyEmailController");
const validateOtpHandler_1 = require("../../Controllers/auth/otp/validateOtpHandler");
const CheckAuthontication_1 = require("../../Middleware/CheckAuthontication");
const router = express_1.default.Router();
//sign-up
router.post("/auth/register", (0, BodyValidator_1.default)({ schema: UserSchema_1.registerSchema }), RegisterController_1.RegisterHandler);
router.post("/auth/verify-email", (0, BodyValidator_1.default)({ schema: UserSchema_1.otpVerifyEmailSchema }), ValidateOtp_1.validateOtp, VerifyEmailController_1.verifyEmailHandler);
router.post("/auth/send-otp", (0, BodyValidator_1.default)({ schema: UserSchema_1.sendToEmailSchema }), SendingOtpController_1.OtpSentToEmailHandler);
//
//reset password
router.post("/auth/validate-otp", (0, BodyValidator_1.default)({ schema: UserSchema_1.otpVerifyEmailSchema }), ValidateOtp_1.validateOtp, validateOtpHandler_1.validateOtpHandler);
router.post("/auth/reset-password", CheckAuthontication_1.checkIfNotAuthonticated, ResetPasswordController_1.resetPasswordHandler);
//
exports.default = router;
