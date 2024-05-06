"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.verifyEmailHandler = void 0;
const UserModel_1 = require("../../../Models/UserModel");
const main_1 = require("../../../Exceptions/main");
async function verifyEmailHandler(req, res, next) {
    const otpBody = req.body;
    const user = await (0, UserModel_1.verifyEmail)(otpBody.email);
    if (!user) {
        const responeError = {
            error: {
                message: "This user is not exist!",
                errorCode: main_1.ErrorCode.USER_NOT_FOUND,
                errorStatus: main_1.ErrorStatus.BAD_REQUEST,
                details: { isEmailVerified: false, success: false }
            }
        };
        return res.json(responeError);
    }
    res.json({
        message: "Your email has been activated successfully!",
        isEmailVerified: true,
        success: true
    });
}
exports.verifyEmailHandler = verifyEmailHandler;
