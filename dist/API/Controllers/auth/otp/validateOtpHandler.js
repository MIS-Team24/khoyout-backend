"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.validateOtpHandler = void 0;
const Messages_1 = require("../../../../Services/responses/Messages");
async function validateOtpHandler(req, res) {
    res.json({
        Otp: {
            isOtpValid: true,
            message: Messages_1.Messages.OTP_VALID
        }
    });
}
exports.validateOtpHandler = validateOtpHandler;
