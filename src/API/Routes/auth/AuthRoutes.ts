import express from "express";
import BodyValidator from "../../Middleware/BodyValidator";
import { RegisterHandler } from "../../Controllers/auth/sign_up/RegisterController";
import { OtpSentToEmailHandler } from "../../Controllers/auth/otp/SendingOtpController";
import { otpVerifyEmailSchema, registerSchema, emailSchema, resetPasswordSchema } from "../../../Services/validationSchemas/UserSchema";
import { resetPasswordHandler } from "../../Controllers/auth/log_in/ResetPasswordController";
import { validateOtp } from "../../Middleware/ValidateOtp";
import { verifyEmailHandler } from "../../Controllers/auth/sign_up/VerifyEmailController";
import { validateOtpHandler } from "../../Controllers/auth/otp/validateOtpHandler";
import { checkIfNotAuthenticated } from "../../Middleware/CheckAuth";

const router = express.Router();

//sign-up
router.post("/register", BodyValidator({schema: registerSchema}), RegisterHandler);
router.post("/verify-email", BodyValidator({schema: otpVerifyEmailSchema}), validateOtp, verifyEmailHandler);
router.post("/send-otp", BodyValidator({schema: emailSchema}), OtpSentToEmailHandler)
//

//reset password
router.post("/validate-otp", BodyValidator({schema: otpVerifyEmailSchema}), validateOtp , validateOtpHandler);
router.put("/reset-password", checkIfNotAuthenticated ,BodyValidator({schema: resetPasswordSchema}), resetPasswordHandler);
//

export default router;