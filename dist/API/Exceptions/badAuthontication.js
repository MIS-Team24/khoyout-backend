"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.BadAuthonticationException = void 0;
const main_1 = require("./main");
class BadAuthonticationException extends main_1.HttpExceptions {
    constructor(message, errorCode, details) {
        super(message, errorCode, 401, details);
    }
}
exports.BadAuthonticationException = BadAuthonticationException;
