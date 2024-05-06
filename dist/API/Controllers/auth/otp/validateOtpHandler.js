"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.validateOtpHandler = void 0;
async function validateOtpHandler(req, res) {
    res.json({
        Otp: {
            success: true,
            isOtpValid: true,
            message: "Otp is correct!",
        }
    });
}
exports.validateOtpHandler = validateOtpHandler;
