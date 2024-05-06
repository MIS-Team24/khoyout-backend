import { NextFunction, Request, Response } from "express";
import * as bcrypt from "bcrypt"
import { PasswordResetBody } from "../../../types/auth/auth";
import { resetPassword } from "../../../Models/UserModel";
import { ErrorCode, ErrorStatus } from "../../../Exceptions/main";

export async function resetPasswordHandler (req: Request, res: Response , next : NextFunction)
{
    try {
        const passwordResetBody  = req.body as  PasswordResetBody

        //if password amd repeated password not the same
        if(passwordResetBody.password != passwordResetBody.repeatPassword){
            const responeError = {
                error : {
                    message : "Password and repeated password are not the same!",
                    errorCode : ErrorCode.PASSWORD_NOT_REPEATED_PASSWORD,
                    errorStatus : ErrorStatus.BAD_REQUEST,
                    details : {isPasswordUpdated : false , success : false}                            
                }
            }
            return res.json(responeError)
        }
        //

        //hash password
        const salt = await bcrypt.genSalt(10)
        const hashedPassword = await bcrypt.hash(passwordResetBody.password , salt)
        //

        await resetPassword({password : hashedPassword}
            , passwordResetBody.email)

        return res.json({
            success : true,
            isPasswordUpdated : true,
            message : "The password changed successfully"
        })
        
    } catch (error) {
        const responeError = {
            error : {
                message : "Internal server error!",
                errorCode : ErrorCode.SERVER_ERROR,
                errorStatus : ErrorStatus.SERVER_ERROR,
                details : {isPasswordUpdated : false , success : false , error}                            
            }
        }
        return res.json(responeError)
    }
}

