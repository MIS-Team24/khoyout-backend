import { NextFunction, Request, Response } from "express";
import { ZodError, z } from "zod";

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

                res.status(400).json({ error: 'Invalid data', details: errorMessages });
            } else {
                res.status(500).json({ error: 'Internal Server Error' });
            }
        }
    }
}
