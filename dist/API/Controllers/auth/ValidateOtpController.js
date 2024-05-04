"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.validateOtp = void 0;
const bcrypt = __importStar(require("bcrypt"));
const OtpModel_1 = require("../../Models/OtpModel");
async function validateOtp(req, res, next) {
    const otpBody = req.body;
    const targetOtp = await (0, OtpModel_1.findOtpById)(otpBody.id);
    if (!targetOtp)
        res.json({ error: "This otp is not valid!" });
    //compare otp id
    let isOtpCorrect = await bcrypt.compare(otpBody.code, targetOtp?.id || "");
    if (!isOtpCorrect)
        res.json({ error: "This otp is not valid!" });
    //
    //compare otp code itself
    if (otpBody)
        res.json({ error: "This otp is not valid!" });
    //
}
exports.validateOtp = validateOtp;
