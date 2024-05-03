import { Request, Response } from "express";
import 'dotenv/config';
import * as bcrypt from "bcrypt"
import { PasswordResetBody } from "../../types/auth/auth";
import { resetPassword } from "../../Models/UserModel";


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

        const user = await resetPassword({password : hashedPassword}
            , passwordResetBody.email)
        res.json({message : "The password changed successfully"})
    } catch (error) {
        res.json({error})
    }
}
