"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.passportLocal = exports.logoutProcess = exports.getUserAfterLogged = void 0;
const passport_1 = __importDefault(require("passport"));
const passportLocalStrategy_1 = require("../../../../Services/passportAuth/passportLocalStrategy");
(0, passportLocalStrategy_1.initializePassport)(passport_1.default);
const getUserAfterLogged = async (req, res) => {
    //get authonticated user
    if (req.user) {
        return res.json({ user: req.user });
    }
    else {
        return res.json({ user: null });
    }
};
exports.getUserAfterLogged = getUserAfterLogged;
const logoutProcess = async (req, res) => {
    req.logOut((error) => {
        if (error)
            return res.json({ error });
        req.session.destroy((error) => {
            return res.json({ error });
        });
        return res.json({
            success: true,
            message: "user loged out successfully"
        });
    });
};
exports.logoutProcess = logoutProcess;
exports.passportLocal = passport_1.default;
//module.exports = {passport , getUserAfterLogged , logoutProcess}
