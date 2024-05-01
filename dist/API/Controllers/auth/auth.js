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
exports.RegisterHandler = exports.loginHandler = void 0;
const User_1 = require("../../Models/User");
const bcrypt = __importStar(require("bcrypt"));
function loginHandler(req, res) {
    const loginBody = req.body;
    res.status(200).send("login");
}
exports.loginHandler = loginHandler;
async function RegisterHandler(req, res) {
    const registerBody = req.body;
    //check if user already exist 
    const userExistence = await (0, User_1.isUserExist)(registerBody.email);
    if (userExistence)
        res.json({ error: "This user is already exist" });
    //
    //if password amd repeated password not the same
    if (registerBody.password != registerBody.repeatPassword) {
        res.json({ error: "Password and repeated password are not the same!" });
    }
    //
    //add this user to database
    //hash password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(registerBody.password, salt);
    //
    const newUser = {
        email: registerBody.email,
        fullName: registerBody.fullName,
        password: hashedPassword
    };
    const user = await (0, User_1.addUser)(newUser);
    res.status(200).json({ message: "User has been added successfuly!", user });
    //
}
exports.RegisterHandler = RegisterHandler;
