import express from "express";
import BodyValidator from "../../Middleware/BodyValidator";
import { RegisterHandler } from "../../Controllers/auth/sign_up/RegisterController";
import { OtpSentToEmailHandler } from "../../Controllers/auth/otp/SendingOtpController";
import { otpVerifyEmailSchema, registerSchema, sendToEmailSchema } from "../../../Services/validationSchemas/UserSchema";
import { resetPasswordHandler } from "../../Controllers/auth/log_in/ResetPasswordController";
import { validateOtp } from "../../Middleware/ValidateOtp";
import { verifyEmailHandler } from "../../Controllers/auth/sign_up/VerifyEmailController";
import { validateOtpHandler } from "../../Controllers/auth/otp/validateOtpHandler";
import { checkIfNotAuthonticated } from "../../Middleware/CheckAuthontication";

const router = express.Router();

//sign-up
router.post("/auth/register", BodyValidator({schema: registerSchema})
    , RegisterHandler)
router.post("/auth/verify-email", BodyValidator({schema: otpVerifyEmailSchema}) 
    , validateOtp , verifyEmailHandler)
router.post("/auth/send-otp", BodyValidator({schema: sendToEmailSchema})
    , OtpSentToEmailHandler)
//

//reset password
router.post("/auth/validate-otp", BodyValidator({schema: otpVerifyEmailSchema})
, validateOtp , validateOtpHandler);
router.post("/auth/reset-password", checkIfNotAuthonticated
, resetPasswordHandler);
//

export default router;