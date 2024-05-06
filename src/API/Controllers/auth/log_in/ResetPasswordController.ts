import { Request, Response } from "express";
import * as bcrypt from "bcrypt"
import { PasswordResetBody } from "../../../types/auth/auth";
import { resetPassword } from "../../../Models/UserModel";

export async function resetPasswordHandler (req: Request, res: Response)
{
    try {
        const passwordResetBody  = req.body as  PasswordResetBody

        //if password amd repeated password not the same
        if(passwordResetBody.password != passwordResetBody.repeatPassword){
            res.json({error : "Password and repeated password are not the same!"})
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
            message : "The password changed successfully"
        })
        
    } catch (error) {
        return res.json({
            error : {
                message : "Something went wrong, try again!",
                errorStatus : 500,                
                details : error
            }
        })
    }
}

