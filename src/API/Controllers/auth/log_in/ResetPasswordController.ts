import { NextFunction, Request, Response } from "express";
import * as bcrypt from "bcrypt"
import { PasswordResetBody } from "../../../types/auth/auth";
import { resetPassword } from "../../../Models/UserModel";
import { BadRequestException } from "../../../Exceptions/badRequest";
import { ErrorCode } from "../../../Exceptions/main";
import { BadServerException } from "../../../Exceptions/badServer";

export async function resetPasswordHandler (req: Request, res: Response , next : NextFunction)
{
    try {
        const passwordResetBody  = req.body as  PasswordResetBody

        //if password amd repeated password not the same
        if(passwordResetBody.password != passwordResetBody.repeatPassword){
            next(new BadRequestException("Password and repeated password are not the same!"
            ,ErrorCode.PASSWORD_NOT_REPEATED_PASSWORD , {
                success : false,
                isPasswordUpdated : false
            }))
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
        next(new BadServerException("Internal server error!" , ErrorCode.SERVER_ERROR
            , {
                success : false,
                isPasswordUpdated : false,
                error
            })
        )
    }
}

