import { NextFunction, Request, Response } from "express";
import { ZodError, z } from "zod";
import { ErrorCode, ErrorStatus } from "../Exceptions/main";
import { errorResponseTemplate } from "../../Services/responses/ErrorTemplate";
import { BadRequestException } from "../Exceptions/badRequest";
import { Messages } from "../../Services/responses/Messages";
import { BadServerException } from "../Exceptions/badServer";

type BodyValidatorOptions = {
    schema: z.ZodObject<any, any>
}

export default function BodyValidator(options: BodyValidatorOptions) {
    return function (req: Request, res: Response, next: NextFunction) {
        try {
            options.schema.parse(req.body);
            next();
        } catch (error) {
            if (error instanceof ZodError) {
                const errorMessages = error.errors.map((issue: any) => ({
                    message: `${issue.path.join('.')} is ${issue.message}`,
                }));

                return res.json(errorResponseTemplate(
                    new BadRequestException(Messages.INVALID_DATA 
                        , ErrorCode.INVALID_DATA
                        ,{error : errorMessages, success : false , isDataValid : false})
                ))
            } else { 
                return res.json(errorResponseTemplate(
                    new BadServerException(Messages.SERVER_ERROR 
                        , ErrorCode.SERVER_ERROR
                        ,{error , success : false , isDataValid : false})
                ))
            }
        }
    }
}
