import { Response , Request, NextFunction} from "express";
import { OtpBody } from "../../../types/auth/auth";
import { verifyEmail } from "../../../Models/UserModel";
import { ErrorCode, ErrorStatus } from "../../../Exceptions/main";

export async function verifyEmailHandler (req: Request, res: Response , next : NextFunction)
{
    const otpBody = req.body as OtpBody
    const user = await verifyEmail(otpBody.email)
    if(!user){
        const responeError = {
            error : {
                message : "This user is not exist!" ,
                errorCode : ErrorCode.USER_NOT_FOUND,
                errorStatus : ErrorStatus.BAD_REQUEST,
                details : {isEmailVerified : false , success : false}                            
            }
        }
        return res.json(responeError)
    } 

    res.json({
        message : "Your email has been activated successfully!",
        isEmailVerified : true,
        success: true
    })
}