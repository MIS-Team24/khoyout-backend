import { NextFunction  , Response , Request} from "express";
import * as bcrypt from "bcrypt"
import { OtpBody } from "../types/auth/auth";
import { findOtpById } from "../Models/OtpModel";
import * as jwt from "jsonwebtoken"


export async function validateOtp (req: Request, res: Response , next : NextFunction)
{
    const otpBody = req.body as OtpBody

    const targetOtp = await findOtpById(otpBody.keyVal)
    if(!targetOtp){
        return res.json({
            Otp :{
                success : false , 
                message : "this otp is not valid!"
            }
        })  
    } 

    //check the validation period token
    const token = targetOtp?.expiredAt;
    if(token){
        jwt.verify(token,process.env.ACCESS_TOKEN_SECRET_KEY || "hello world"
            ,async (error: any) => {
            if (error) {
                return res.json({
                    Otp :{
                        success : false , 
                        message : "this otp is not valid!",
                        error
                    }
                })               
            } else {               
                //compare otp code itself
                if(otpBody.code !== targetOtp?.code) {
                    return res.json({
                        Otp :{
                            success : false , 
                            message : "this otp is not valid!"
                        }
                    })     
                }
                //
                next()
            }
        })
    }else{
        return res.json({
            Otp :{
                success : false , 
                message : "this otp is expired!"
            }
        })   
    }
    //
}