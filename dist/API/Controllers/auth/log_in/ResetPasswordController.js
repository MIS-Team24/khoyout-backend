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
async function resetPasswordHandler(req, res) {
    try {
        const passwordResetBody = req.body;
        //if password amd repeated password not the same
        if (passwordResetBody.password != passwordResetBody.repeatPassword) {
            res.json({ error: "Password and repeated password are not the same!" });
        }
        //
        //hash password
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(passwordResetBody.password, salt);
        //
        await (0, UserModel_1.resetPassword)({ password: hashedPassword }, passwordResetBody.email);
        return res.json({
            success: true,
            message: "The password changed successfully"
        });
    }
    catch (error) {
        return res.json({
            error: {
                message: "Something went wrong, try again!",
                errorStatus: 500,
                details: error
            }
        });
    }
}
exports.resetPasswordHandler = resetPasswordHandler;
