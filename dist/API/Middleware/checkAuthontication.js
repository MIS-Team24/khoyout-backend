"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.checkIfNotAuthonticated = exports.checkIfAuthonticated = void 0;
const main_1 = require("../Exceptions/main");
const checkIfAuthonticated = (req, res, next) => {
    if (!req.isAuthenticated()) {
        const responeError = {
            error: {
                message: "User is not authonticated",
                errorCode: main_1.ErrorCode.USER_NOT_AUTHONTICATED,
                errorStatus: main_1.ErrorStatus.UNAUTHORIZED,
                details: { authonticated: false, isLoggedIn: false }
            }
        };
        return res.json(responeError);
    }
    next();
};
exports.checkIfAuthonticated = checkIfAuthonticated;
const checkIfNotAuthonticated = (req, res, next) => {
    if (req.isAuthenticated()) {
        const responeError = {
            error: {
                message: "User is already authonticated",
                errorCode: main_1.ErrorCode.USER_ALREADY_AUTHONTICATED,
                errorStatus: main_1.ErrorStatus.BAD_REQUEST,
                details: { authonticated: true, isLoggedIn: true }
            }
        };
        return res.json(responeError);
    }
    next();
};
exports.checkIfNotAuthonticated = checkIfNotAuthonticated;
