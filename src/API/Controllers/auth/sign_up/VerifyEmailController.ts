import { Response , Request, NextFunction} from "express";
import { OtpBody } from "../../../types/auth/auth";
import { verifyEmail } from "../../../Models/UserModel";
import { BadRequestException } from "../../../Exceptions/badRequest";
import { ErrorCode } from "../../../Exceptions/main";

export async function verifyEmailHandler (req: Request, res: Response , next : NextFunction)
{
    const otpBody = req.body as OtpBody
    const user = await verifyEmail(otpBody.email)
    if(!user){
        next(new BadRequestException("This user is not exist!" 
        , ErrorCode.USER_NOT_FOUND , {
            isEmailVerified : false,
            success: false
        }))
    } 
    res.json({
        message : "Your email has been activated successfully!",
        isEmailVerified : true,
        success: true
    })
}