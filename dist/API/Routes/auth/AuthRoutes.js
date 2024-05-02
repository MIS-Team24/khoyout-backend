"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const zod_1 = require("zod");
const BodyValidator_1 = __importDefault(require("../../Middleware/BodyValidator"));
const RegisterController_1 = require("../../Controllers/auth/RegisterController");
const OtpController_1 = require("../../Controllers/auth/OtpController");
const LoginController_1 = require("../../Controllers/auth/LoginController");
const router = express_1.default.Router();
//
const login = zod_1.z.object({
    email: zod_1.z.string().email(),
    password: zod_1.z.string().min(8)
});
router.post("/auth/login", (0, BodyValidator_1.default)({ schema: login }), LoginController_1.loginHandler);
//
//
const register = zod_1.z.object({
    fullName: zod_1.z.string().min(2),
    email: zod_1.z.string().email(),
    password: zod_1.z.string().min(8),
    repeatPassword: zod_1.z.string().min(8)
});
router.post("/auth/register", (0, BodyValidator_1.default)({ schema: register }), RegisterController_1.RegisterHandler);
//
//
const sendToEmail = zod_1.z.object({
    email: zod_1.z.string().email(),
});
router.post("/auth/sign-up/send-otp", (0, BodyValidator_1.default)({ schema: sendToEmail }), OtpController_1.OtpSentToEmailHandler);
//
exports.default = router;
