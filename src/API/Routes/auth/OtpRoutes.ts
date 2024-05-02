import { z } from "zod";
import { OtpSentToEmailHandler } from "../../Controllers/auth/OtpController";
import BodyValidator from "../../Middleware/BodyValidator";
import express from "express";

const router = express.Router();


const sendToEmail = z.object({
    email: z.string().email(),
});

router.post("/auth/sign-up/send-otp", BodyValidator({schema: sendToEmail}), OtpSentToEmailHandler)


export default router;