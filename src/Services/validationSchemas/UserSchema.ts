import { DayOfWeek, UserDeleteAccountReason } from "@prisma/client";
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

export const DeleteAccountBodySchema = z.object({
    reason: z.nativeEnum(UserDeleteAccountReason),
    otherReason: z.string().optional()
});

export const postAvailableTime = z.object({
    startTime: z.string().regex(/^(?:[01]\d|2[0-3]):[0-5]\d:[0-5]\d$/),
    endTime: z.string().regex(/^(?:[01]\d|2[0-3]):[0-5]\d:[0-5]\d$/),
    day: z.nativeEnum(DayOfWeek)
});

export enum markType {
    Finished = "Finished",
    OnGoing = "OnGoing",
    Missed = "Missed"
}


export const appointmentMarking = z.object({
    markAs: z.nativeEnum(markType)
});