"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.checkIfNotAuthonticated = exports.checkIfAuthonticated = void 0;
const main_1 = require("../Exceptions/main");
const ErrorTemplate_1 = require("../../Services/responses/ErrorTemplate");
const Messages_1 = require("../../Services/responses/Messages");
const badAuthontication_1 = require("../Exceptions/badAuthontication");
const badRequest_1 = require("../Exceptions/badRequest");
const checkIfAuthonticated = (req, res, next) => {
    if (!req.isAuthenticated()) {
        return res.json((0, ErrorTemplate_1.errorResponseTemplate)(new badAuthontication_1.BadAuthonticationException(Messages_1.Messages.USER_NOT_AUTHONTICATED, main_1.ErrorCode.USER_NOT_AUTHONTICATED, { authonticated: false, isLoggedIn: false })));
    }
    next();
};
exports.checkIfAuthonticated = checkIfAuthonticated;
const checkIfNotAuthonticated = (req, res, next) => {
    if (req.isAuthenticated()) {
        return res.json((0, ErrorTemplate_1.errorResponseTemplate)(new badRequest_1.BadRequestException(Messages_1.Messages.USER_ALREADY_AUTHONTICATED, main_1.ErrorCode.USER_ALREADY_AUTHONTICATED, { authonticated: true, isLoggedIn: true })));
    }
    next();
};
exports.checkIfNotAuthonticated = checkIfNotAuthonticated;
