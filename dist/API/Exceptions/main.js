"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ResStatus = exports.ErrorCode = exports.HttpExceptions = void 0;
class HttpExceptions extends Error {
    constructor(message, errorCode, errorStatus, details) {
        super(message);
        this.message = message;
        this.errorStatus = errorStatus;
        this.errorCode = errorCode;
        this.details = details;
    }
}
exports.HttpExceptions = HttpExceptions;
var ErrorCode;
(function (ErrorCode) {
    ErrorCode[ErrorCode["USER_ALREADY_EXIST"] = 1001] = "USER_ALREADY_EXIST";
    ErrorCode[ErrorCode["USER_NOT_FOUND"] = 1002] = "USER_NOT_FOUND";
    ErrorCode[ErrorCode["PASSWORD_NOT_REPEATED_PASSWORD"] = 1003] = "PASSWORD_NOT_REPEATED_PASSWORD";
    ErrorCode[ErrorCode["OTP_NOT_VALID"] = 1004] = "OTP_NOT_VALID";
    ErrorCode[ErrorCode["NOT_ABLE_SEND_EMAIL"] = 1005] = "NOT_ABLE_SEND_EMAIL";
    ErrorCode[ErrorCode["EXPIRED_DATE"] = 1006] = "EXPIRED_DATE";
    ErrorCode[ErrorCode["SERVER_ERROR"] = 1007] = "SERVER_ERROR";
    ErrorCode[ErrorCode["INVALID_DATA"] = 1008] = "INVALID_DATA";
    ErrorCode[ErrorCode["USER_NOT_AUTHONTICATED"] = 1009] = "USER_NOT_AUTHONTICATED";
    ErrorCode[ErrorCode["USER_ALREADY_AUTHONTICATED"] = 1010] = "USER_ALREADY_AUTHONTICATED";
    ErrorCode[ErrorCode["INCORRECT_PASSWORD"] = 1011] = "INCORRECT_PASSWORD";
})(ErrorCode || (exports.ErrorCode = ErrorCode = {}));
var ResStatus;
(function (ResStatus) {
    ResStatus[ResStatus["I_SERVER_ERROR"] = 500] = "I_SERVER_ERROR";
    ResStatus[ResStatus["SERICE_UNAVAILABLE"] = 503] = "SERICE_UNAVAILABLE";
    ResStatus[ResStatus["BAD_REQUEST"] = 400] = "BAD_REQUEST";
    ResStatus[ResStatus["UNAUTHORIZED"] = 401] = "UNAUTHORIZED";
    ResStatus[ResStatus["PAGE_NOT_FOUND"] = 404] = "PAGE_NOT_FOUND";
    ResStatus[ResStatus["FORBIDDEN"] = 403] = "FORBIDDEN";
    ResStatus[ResStatus["OK"] = 200] = "OK";
    ResStatus[ResStatus["SOURCE_CREATED"] = 201] = "SOURCE_CREATED";
    ResStatus[ResStatus["NO_CONTENT"] = 204] = "NO_CONTENT";
})(ResStatus || (exports.ResStatus = ResStatus = {}));
