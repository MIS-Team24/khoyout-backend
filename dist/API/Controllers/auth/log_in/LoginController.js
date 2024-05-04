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
exports.loginHandler = void 0;
require("dotenv/config");
const UserModel_1 = require("../../../Models/UserModel");
const bcrypt = __importStar(require("bcrypt"));
const generateToken_1 = require("../../../../Services/generateToken");
async function loginHandler(req, res) {
    const loginBody = req.body;
    //check if user exist 
    const user = await (0, UserModel_1.findUserByEmail)(loginBody.email);
    if (!user)
        res.json({ error: "This user not exist!" });
    //
    //compare password
    let isPasswordCorrect = await bcrypt.compare(loginBody.password, user?.password || "");
    if (!isPasswordCorrect)
        res.json({ error: "incorrect password!" });
    //
    const token = (0, generateToken_1.generateToken)({ id: user?.id }, "5m");
    const maxAge = 5 * 24 * 60 * 60 * 1000; //this is 5 days persiod using milliseconds
    let targetUser = {
        id: user?.id,
        fullName: user?.fullName,
        email: user?.email,
        phone: user?.phone,
        createdAt: user?.createdAt,
        token
    };
    res.cookie('khoyout_user', token, { httpOnly: true, maxAge }).json(targetUser);
}
exports.loginHandler = loginHandler;
