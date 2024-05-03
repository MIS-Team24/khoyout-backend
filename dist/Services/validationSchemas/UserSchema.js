"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.sendToEmailSchema = exports.registerSchema = exports.loginSchema = void 0;
const zod_1 = require("zod");
exports.loginSchema = zod_1.z.object({
    email: zod_1.z.string().email(),
    password: zod_1.z.string().min(8)
});
exports.registerSchema = zod_1.z.object({
    fullName: zod_1.z.string().min(2),
    email: zod_1.z.string().email(),
    password: zod_1.z.string().min(8),
    repeatPassword: zod_1.z.string().min(8)
});
exports.sendToEmailSchema = zod_1.z.object({
    email: zod_1.z.string().email(),
});
