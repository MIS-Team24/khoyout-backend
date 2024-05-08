"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.verifyEmailHandler = void 0;
const UserModel_1 = require("../../../Models/UserModel");
const main_1 = require("../../../Exceptions/main");
const ErrorTemplate_1 = require("../../../../Services/responses/ErrorTemplate");
const badRequest_1 = require("../../../Exceptions/badRequest");
const Messages_1 = require("../../../../Services/responses/Messages");
async function verifyEmailHandler(req, res, next) {
    const otpBody = req.body;
    const user = await (0, UserModel_1.verifyEmail)(otpBody.email);
    if (!user) {
        return res.status(main_1.ErrorStatus.BAD_REQUEST).json((0, ErrorTemplate_1.errorResponseTemplate)(new badRequest_1.BadRequestException(Messages_1.Messages.USER_NOT_FOUND, main_1.ErrorCode.USER_NOT_FOUND, { isEmailVerified: false, success: false })));
    }
    res.json({
        message: Messages_1.Messages.EMAIL_ACTIVATED,
        isEmailVerified: true,
        success: true
    });
}
exports.verifyEmailHandler = verifyEmailHandler;
