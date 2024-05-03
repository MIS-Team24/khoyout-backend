import express from "express";
import BodyValidator from "../../Middleware/BodyValidator";
import { RegisterHandler } from "../../Controllers/auth/RegisterController";
import { OtpSentToEmailHandler } from "../../Controllers/auth/OtpController";
import { loginHandler } from "../../Controllers/auth/LoginController";
import { loginSchema, registerSchema, sendToEmailSchema } from "../../../Services/validationSchemas/UserSchema";
import { resetPasswordHandler } from "../../Controllers/auth/ResetPassword";
import { logoutHandler } from "../../Controllers/auth/LogoutController";
import { verifyTokenHandler } from "../../Controllers/auth/verifyTokenController";

const router = express.Router();

router.post("/auth/login", BodyValidator({schema: loginSchema}), loginHandler);
router.post("/auth/register", BodyValidator({schema: registerSchema}), RegisterHandler)
router.post("/auth/sign-up/send-otp", BodyValidator({schema: sendToEmailSchema}), OtpSentToEmailHandler)
router.get("/auth/logout", logoutHandler);
router.post("/auth/forget-password", BodyValidator({schema: sendToEmailSchema}), OtpSentToEmailHandler);
router.post("/auth/reset-password", resetPasswordHandler);
router.get("/auth/verify-token", verifyTokenHandler);

export default router;