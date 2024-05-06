import { NextFunction, Request, Response } from "express";
import { ZodError, z } from "zod";
import { ErrorCode, ErrorStatus } from "../Exceptions/main";

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

                const responeError = {
                    error : {
                        message : 'Invalid data' ,
                        errorCode : ErrorCode.INVALID_DATA,
                        errorStatus : ErrorStatus.BAD_REQUEST,
                        details : {error : errorMessages , isDataValid : false}                            
                    }
                }

                res.json(responeError) 
            } else {
                const responeError = {
                    error : {
                        message : 'Internal Server Error' ,
                        errorCode : ErrorCode.SERVER_ERROR,
                        errorStatus : ErrorStatus.SERVER_ERROR,
                        details : {error , isDataValid : false}                            
                    }
                }

                res.json(responeError)  
            }
        }
    }
}
