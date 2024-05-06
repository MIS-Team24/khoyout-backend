import { NextFunction  , Response , Request} from "express";
import { OtpBody } from "../types/auth/auth";
import { findOtpById } from "../Models/OtpModel";
import * as jwt from "jsonwebtoken"
import { BadRequestException } from "../Exceptions/badRequest";
import { ErrorCode } from "../Exceptions/main";

export async function validateOtp (req: Request, res: Response , next : NextFunction)
{
    const otpBody = req.body as OtpBody

    const targetOtp = await findOtpById(otpBody.keyVal)
    if(!targetOtp){ 
        next(new BadRequestException("Otp is not valid!" , ErrorCode.OTP_NOT_VALID 
            , {
                success : false,
                isOtpValid : false
            })
        )               
    } 

    //check the validation period token
    const token = targetOtp?.expiredAt;
    if(token){
        jwt.verify(token,process.env.ACCESS_TOKEN_SECRET_KEY || "hello world"
            ,async (error: any) => {
            if (error) {
                next(new BadRequestException("Otp is not valid!" , ErrorCode.EXPIRED_DATE 
                    , {
                        success : false , 
                        isOtpValid : false,
                        error
                    }))

            } else {               
                //compare otp code itself
                if(otpBody.code !== targetOtp?.code) {
                    next(new BadRequestException("Otp is not valid!" 
                    , ErrorCode.OTP_NOT_VALID 
                    , {
                        success : false,
                        isOtpValid : false
                    }))  
                }
                //
                next()
            }
        })
    }else{
        next(new BadRequestException("Otp is not valid!" , ErrorCode.OTP_NOT_VALID 
            , {
                success : false,
                isOtpValid : false
            }))
    }
    //
}