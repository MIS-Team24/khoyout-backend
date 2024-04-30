"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const zod_1 = require("zod");
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
                res.status(400).json({ error: 'Invalid data', details: errorMessages });
            }
            else {
                res.status(500).json({ error: 'Internal Server Error' });
            }
        }
    };
}
exports.default = BodyValidator;
