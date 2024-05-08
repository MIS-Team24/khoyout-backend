import { NextFunction  , Response , Request} from "express";
import { OtpBody } from "../types/auth/auth";
import { findOtpBy } from "../Models/OtpModel";
import * as jwt from "jsonwebtoken"
import { ErrorCode, ResStatus } from "../Exceptions/main";
import { errorResponseTemplate } from "../../Services/responses/ErrorTemplate";
import { Messages } from "../../Services/responses/Messages";
import { BadRequestException } from "../Exceptions/badRequest";
import { BadServerException } from "../Exceptions/badServer";

export async function validateOtp (req: Request, res: Response , next : NextFunction)
{
    const otpBody = req.body as OtpBody

    const targetOtp = await findOtpBy({id : otpBody.keyVal})
    if(!targetOtp){          
        return res.status(ResStatus.BAD_REQUEST).json(errorResponseTemplate(
            new BadRequestException(Messages.OTP_NOT_VALID 
                , ErrorCode.OTP_NOT_VALID
                ,{isOtpValid:false})
        ))
    } 

    //check the validation period token
    const token = targetOtp?.expiredAt;
    if(token){
        jwt.verify(token,process.env.ACCESS_TOKEN_SECRET_KEY || "hello world"
            ,async (error: any) => {
            if (error) {               
                return res.status(ResStatus.BAD_REQUEST).json(errorResponseTemplate(
                    new BadRequestException(Messages.OTP_EXPIRED 
                        , ErrorCode.EXPIRED_DATE
                        ,{isOtpValid:false, error})
                ))

            } else {               
                //compare otp code itself
                if(otpBody.code !== targetOtp?.code) { 
                    return res.status(ResStatus.BAD_REQUEST).json(errorResponseTemplate(
                        new BadRequestException(Messages.OTP_NOT_VALID 
                            , ErrorCode.OTP_NOT_VALID
                            ,{isOtpValid:false})
                    ))
                }
                //

                next()
            }
        })
    }else{      
        return res.status(ResStatus.I_SERVER_ERROR).json(errorResponseTemplate(
            new BadServerException(Messages.OTP_NOT_VALID 
                , ErrorCode.OTP_NOT_VALID
                ,{isOtpValid:false})
        ))
    }
    //
}