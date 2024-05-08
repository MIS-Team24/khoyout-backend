"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.BadRequestException = void 0;
const main_1 = require("./main");
class BadRequestException extends main_1.HttpExceptions {
    constructor(message, errorCode, details) {
        super(message, errorCode, main_1.ResStatus.BAD_REQUEST, details);
    }
}
exports.BadRequestException = BadRequestException;
