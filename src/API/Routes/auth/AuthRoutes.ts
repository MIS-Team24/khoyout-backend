import express from "express";
import { z } from "zod";
import BodyValidator from "../../Middleware/BodyValidator";
import { RegisterHandler } from "../../Controllers/auth/RegisterController";
import { OtpSentToEmailHandler } from "../../Controllers/auth/OtpController";
import { loginHandler } from "../../Controllers/auth/LoginController";

const router = express.Router();

//
const login = z.object({
    email: z.string().email(),
    password: z.string().min(8)
});
router.post("/auth/login", BodyValidator({schema: login}), loginHandler);
//

//
const register = z.object({
    fullName: z.string().min(2),
    email: z.string().email(),
    password: z.string().min(8),
    repeatPassword: z.string().min(8)
});
router.post("/auth/register", BodyValidator({schema: register}), RegisterHandler)
//

//
const sendToEmail = z.object({
    email: z.string().email(),
});
router.post("/auth/sign-up/send-otp", BodyValidator({schema: sendToEmail}), OtpSentToEmailHandler)
//

export default router;