import { NextFunction, Request, Response } from "express";
import { ZodError, z } from "zod";
import { ErrorCode, ResStatus } from "../Exceptions/main";
import { errorResponseTemplate } from "../../Services/responses/ErrorTemplate";
import { BadRequestException } from "../Exceptions/badRequest";
import { Messages } from "../../Services/responses/Messages";
import { BadServerException } from "../Exceptions/badServer";

export enum objectToValidate {
    BODY,
    QUERY
}

type BodyValidatorOptions = {
    schema: z.ZodObject<any, any>,
    validateTarget?: objectToValidate
}

export default function BodyValidator(options: BodyValidatorOptions) {
    return function (req: Request, res: Response, next: NextFunction) {
        try {
            options.schema.parse(options.validateTarget === objectToValidate.QUERY ? req.query : req.body);
            next();
        } catch (error) {
            if (error instanceof ZodError) {
                const errorMessages = error.errors.map((issue: any) => ({
                    message: `${issue.path.join('.')} is ${issue.message}`,
                }));

                return res.status(ResStatus.BAD_REQUEST).json(errorResponseTemplate(
                    new BadRequestException(Messages.INVALID_DATA, ErrorCode.INVALID_DATA, { isDataValid: false, error: errorMessages })
                ));
            } else { 
                return res.status(ResStatus.I_SERVER_ERROR).json(errorResponseTemplate(
                    new BadServerException(Messages.SERVER_ERROR, ErrorCode.SERVER_ERROR, { isDataValid: false, error })
                ));
            }
        }
    }
}
