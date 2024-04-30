import express from "express";
import { z } from "zod";
import BodyValidator from "../../Middleware/BodyValidator";
import { RegisterHandler, loginHandler } from "../../Controllers/auth/auth";

const router = express.Router();

const login = z.object({
    email: z.string().email(),
    password: z.string().min(8)
});


router.post("/auth/login", BodyValidator({schema: login}), loginHandler);

const register = z.object({
    fullName: z.string().min(2),
    email: z.string().email(),
    password: z.string().min(8),
    repeatPassword: z.string().min(8)
});

router.post("/auth/register", BodyValidator({schema: register}), RegisterHandler)

export default router;