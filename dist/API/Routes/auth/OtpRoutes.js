"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const zod_1 = require("zod");
const OtpController_1 = require("../../Controllers/auth/OtpController");
const BodyValidator_1 = __importDefault(require("../../Middleware/BodyValidator"));
const express_1 = __importDefault(require("express"));
const router = express_1.default.Router();
const sendToEmail = zod_1.z.object({
    email: zod_1.z.string().email(),
});
router.post("/auth/sign-up/send-otp", (0, BodyValidator_1.default)({ schema: sendToEmail }), OtpController_1.OtpSentToEmailHandler);
exports.default = router;
