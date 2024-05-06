"use strict";
//message , status code , error code , details
Object.defineProperty(exports, "__esModule", { value: true });
exports.ErrorCode = exports.HttpExceptions = void 0;
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
    ErrorCode[ErrorCode["ZOD_INVALID_DATA"] = 1008] = "ZOD_INVALID_DATA";
    ErrorCode[ErrorCode["USER_NOT_AUTHONTICATED"] = 1009] = "USER_NOT_AUTHONTICATED";
})(ErrorCode || (exports.ErrorCode = ErrorCode = {}));
