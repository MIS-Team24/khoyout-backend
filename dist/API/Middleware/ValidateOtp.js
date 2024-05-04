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
const OtpModel_1 = require("../Models/OtpModel");
const jwt = __importStar(require("jsonwebtoken"));
async function validateOtp(req, res, next) {
    const otpBody = req.body;
    const targetOtp = await (0, OtpModel_1.findOtpById)(otpBody.keyVal);
    if (!targetOtp) {
        return res.json({
            Otp: {
                success: false,
                message: "this otp is not valid!"
            }
        });
    }
    //check the validation period token
    const token = targetOtp?.expiredAt;
    if (token) {
        jwt.verify(token, process.env.ACCESS_TOKEN_SECRET_KEY || "hello world", async (error) => {
            if (error) {
                return res.json({
                    Otp: {
                        success: false,
                        message: "this otp is not valid!",
                        error
                    }
                });
            }
            else {
                //compare otp code itself
                if (otpBody.code !== targetOtp?.code) {
                    return res.json({
                        Otp: {
                            success: false,
                            message: "this otp is not valid!"
                        }
                    });
                }
                //
                next();
            }
        });
    }
    else {
        return res.json({
            Otp: {
                success: false,
                message: "this otp is expired!"
            }
        });
    }
    //
}
exports.validateOtp = validateOtp;