"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.BadServerException = void 0;
const main_1 = require("./main");
class BadServerException extends main_1.HttpExceptions {
    constructor(message, errorCode, details) {
        super(message, errorCode, 500, details);
    }
}
exports.BadServerException = BadServerException;
