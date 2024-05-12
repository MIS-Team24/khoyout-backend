import { z } from "zod";

export const loginSchema = z.object({
    email: z.string().email(),
    password: z.string().min(8)
});

export const registerSchema = z.object({
    fullName: z.string().min(2),
    email: z.string().email(),
    password: z.string().min(8),
    repeatPassword: z.string().min(8)
});

export const emailSchema = z.object({
    email: z.string().email()
});

export const otpVerifyEmailSchema = z.object({
    email: z.string().email(),
    code : z.string(),
    keyVal  : z.string()
});

export const resetPasswordSchema = z.object({
    email: z.string().email(),
    password: z.string().min(8),
    repeatPassword: z.string().min(8)
});

export const cahngePasswordSchema = z.object({
    password: z.string().min(8),
    repeatPassword: z.string().min(8)
});

