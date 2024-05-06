import { NextFunction  , Response , Request} from "express";
import { OtpBody } from "../types/auth/auth";
import { findOtpById } from "../Models/OtpModel";
import * as jwt from "jsonwebtoken"
import { ErrorCode, ErrorStatus } from "../Exceptions/main";

export async function validateOtp (req: Request, res: Response , next : NextFunction)
{
    const otpBody = req.body as OtpBody

    const targetOtp = await findOtpById(otpBody.keyVal)
    if(!targetOtp){          
        const responeError = {
            error : {
                message : "Otp is not valid!" ,
                errorCode : ErrorCode.OTP_NOT_VALID,
                errorStatus : ErrorStatus.BAD_REQUEST,
                details : {isOtpValid : false , success : false}                            
            }
        }
        return res.json(responeError)
    } 

    //check the validation period token
    const token = targetOtp?.expiredAt;
    if(token){
        jwt.verify(token,process.env.ACCESS_TOKEN_SECRET_KEY || "hello world"
            ,async (error: any) => {
            if (error) {
                const responeError = {
                    error : {
                        message : "Otp is not valid!" ,
                        errorCode : ErrorCode.EXPIRED_DATE,
                        errorStatus : ErrorStatus.BAD_REQUEST,
                        details : {isOtpValid : false , success : false , error}                            
                    }
                }
                return res.json(responeError)    
            } else {               
                //compare otp code itself
                if(otpBody.code !== targetOtp?.code) { 
                    const responeError = {
                        error : {
                            message : "Otp is not valid!" ,
                            errorCode : ErrorCode.OTP_NOT_VALID,
                            errorStatus : ErrorStatus.BAD_REQUEST,
                            details : {isOtpValid : false , success : false}                            
                        }
                    }                   
                    return res.json(responeError) 
                }
                //

                next()
            }
        })
    }else{
        const responeError = {
            error : {
                message : "Otp is not valid!" ,
                errorCode : ErrorCode.OTP_NOT_VALID,
                errorStatus : ErrorStatus.BAD_REQUEST,
                details : {isOtpValid : false , success : false}                            
            }
        }                   
        return res.json(responeError) 
    }
    //
}