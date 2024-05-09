"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.BadServerException = void 0;
const main_1 = require("./main");
class BadServerException extends main_1.HttpExceptions {
    constructor(message, errorCode, details) {
        super(message, errorCode, main_1.ResStatus.I_SERVER_ERROR, details);
    }
}
exports.BadServerException = BadServerException;
