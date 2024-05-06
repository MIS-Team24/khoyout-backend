"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.errorMidllewareHandler = void 0;
const errorMidllewareHandler = (error, req, res) => {
    res.status(error.errorStatus).json({
        error: {
            message: error.message,
            errorCode: error.errorCode,
            errorStatus: error.errorStatus,
            details: error.details
        }
    });
};
exports.errorMidllewareHandler = errorMidllewareHandler;