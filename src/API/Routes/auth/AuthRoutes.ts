import express from "express";
import BodyValidator from "../../Middleware/BodyValidator";
import { RegisterHandler } from "../../Controllers/auth/RegisterController";
import { OtpSentToEmailHandler } from "../../Controllers/auth/OtpController";
import { loginHandler } from "../../Controllers/auth/LoginController";
import { loginSchema, registerSchema, sendToEmailSchema } from "../../../Services/validationSchemas/UserSchema";
import { logoutHandler } from "../../Controllers/auth/logoutController";
import { resetPasswordHandler } from "../../Controllers/auth/ResetPassword";

const router = express.Router();

router.post("/auth/login", BodyValidator({schema: loginSchema}), loginHandler);
router.post("/auth/register", BodyValidator({schema: registerSchema}), RegisterHandler)
router.post("/auth/sign-up/send-otp", BodyValidator({schema: sendToEmailSchema}), OtpSentToEmailHandler)
router.post("/auth/logout", logoutHandler);
router.post("/auth/forget-password", BodyValidator({schema: sendToEmailSchema}), OtpSentToEmailHandler);
router.post("/auth/reset-password", resetPasswordHandler);

export default router;