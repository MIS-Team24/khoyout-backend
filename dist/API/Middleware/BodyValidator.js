"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const zod_1 = require("zod");
const main_1 = require("../Exceptions/main");
const ErrorTemplate_1 = require("../../Services/responses/ErrorTemplate");
const badRequest_1 = require("../Exceptions/badRequest");
const Messages_1 = require("../../Services/responses/Messages");
const badServer_1 = require("../Exceptions/badServer");
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
                return res.status(main_1.ErrorStatus.BAD_REQUEST).json((0, ErrorTemplate_1.errorResponseTemplate)(new badRequest_1.BadRequestException(Messages_1.Messages.INVALID_DATA, main_1.ErrorCode.INVALID_DATA, { error: errorMessages, success: false, isDataValid: false })));
            }
            else {
                return res.status(main_1.ErrorStatus.SERVER_ERROR).json((0, ErrorTemplate_1.errorResponseTemplate)(new badServer_1.BadServerException(Messages_1.Messages.SERVER_ERROR, main_1.ErrorCode.SERVER_ERROR, { error, success: false, isDataValid: false })));
            }
        }
    };
}
exports.default = BodyValidator;
