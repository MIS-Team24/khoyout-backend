"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const zod_1 = require("zod");
const main_1 = require("../Exceptions/main");
function BodyValidator(options) {
    return function (req, res, next) {
        try {
            options.schema.parse(req.body);
            next();
        }
        catch (error) {
            if (error instanceof zod_1.ZodError) {
                const errorMessages = error.errors.map((issue) => ({
                    message: `${issue.path.join('.')} is ${issue.message}`,
                }));
                const responeError = {
                    error: {
                        message: 'Invalid data',
                        errorCode: main_1.ErrorCode.INVALID_DATA,
                        errorStatus: main_1.ErrorStatus.BAD_REQUEST,
                        details: { error: errorMessages, isDataValid: false }
                    }
                };
                res.json(responeError);
            }
            else {
                const responeError = {
                    error: {
                        message: 'Internal Server Error',
                        errorCode: main_1.ErrorCode.SERVER_ERROR,
                        errorStatus: main_1.ErrorStatus.SERVER_ERROR,
                        details: { error, isDataValid: false }
                    }
                };
                res.json(responeError);
            }
        }
    };
}
exports.default = BodyValidator;
