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
exports.resetPasswordHandler = void 0;
const bcrypt = __importStar(require("bcrypt"));
const UserModel_1 = require("../../../Models/UserModel");
const main_1 = require("../../../Exceptions/main");
const ErrorTemplate_1 = require("../../../../Services/responses/ErrorTemplate");
const badRequest_1 = require("../../../Exceptions/badRequest");
const Messages_1 = require("../../../../Services/responses/Messages");
const badServer_1 = require("../../../Exceptions/badServer");
async function resetPasswordHandler(req, res, next) {
    try {
        const passwordResetBody = req.body;
        //check if user already exist 
        const userTarget = await (0, UserModel_1.findUserBy)({ email: passwordResetBody.email });
        if (!userTarget) {
            return res.status(main_1.ResStatus.BAD_REQUEST).json((0, ErrorTemplate_1.errorResponseTemplate)(new badRequest_1.BadRequestException(Messages_1.Messages.USER_NOT_FOUND, main_1.ErrorCode.USER_NOT_FOUND, { isPasswordUpdated: false })));
        }
        //
        //if password amd repeated password not the same
        if (passwordResetBody.password != passwordResetBody.repeatPassword) {
            return res.status(main_1.ResStatus.BAD_REQUEST).json((0, ErrorTemplate_1.errorResponseTemplate)(new badRequest_1.BadRequestException(Messages_1.Messages.PASS_NOT_R_PASS, main_1.ErrorCode.PASSWORD_NOT_REPEATED_PASSWORD, { isPasswordUpdated: false })));
        }
        //
        //hash password
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(passwordResetBody.password, salt);
        //
        await (0, UserModel_1.updateUser)({ email: passwordResetBody.email }, { password: hashedPassword });
        return res.json({
            isPasswordUpdated: true,
            message: Messages_1.Messages.PASSWORD_UPDATED
        });
    }
    catch (error) {
        console.log(error);
        return res.status(main_1.ResStatus.I_SERVER_ERROR).json((0, ErrorTemplate_1.errorResponseTemplate)(new badServer_1.BadServerException(Messages_1.Messages.SERVER_ERROR, main_1.ErrorCode.SERVER_ERROR, { isPasswordUpdated: false, error })));
    }
}
exports.resetPasswordHandler = resetPasswordHandler;
