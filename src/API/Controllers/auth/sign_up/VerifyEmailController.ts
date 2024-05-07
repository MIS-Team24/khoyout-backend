import { Response , Request, NextFunction} from "express";
import { OtpBody } from "../../../types/auth/auth";
import { verifyEmail } from "../../../Models/UserModel";
import { ErrorCode } from "../../../Exceptions/main";
import { errorResponseTemplate } from "../../../../Services/responses/ErrorTemplate";
import { BadRequestException } from "../../../Exceptions/badRequest";
import { Messages } from "../../../../Services/responses/Messages";

export async function verifyEmailHandler (req: Request, res: Response , next : NextFunction)
{
    const otpBody = req.body as OtpBody
    const user = await verifyEmail(otpBody.email)
    if(!user){
        return res.json(errorResponseTemplate(
            new BadRequestException(Messages.USER_NOT_FOUND 
                , ErrorCode.USER_NOT_FOUND
                ,{isEmailVerified : false , success : false})
        ))
    } 

    res.json({
        message : Messages.EMAIL_ACTIVATED,
        isEmailVerified : true,
        success: true
    })
}