"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.BadValidationException = void 0;
const main_1 = require("./main");
class BadValidationException extends main_1.HttpExceptions {
    constructor(message, errorCode, details) {
        super(message, errorCode, main_1.ErrorStatus.BAD_REQUEST, details);
    }
}
exports.BadValidationException = BadValidationException;
