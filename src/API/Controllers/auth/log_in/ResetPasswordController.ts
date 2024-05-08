import { NextFunction, Request, Response } from "express";
import * as bcrypt from "bcrypt"
import { PasswordResetBody } from "../../../types/auth/auth";
import { findUserBy, resetPassword } from "../../../Models/UserModel";
import { ErrorCode, ResStatus } from "../../../Exceptions/main";
import { errorResponseTemplate } from "../../../../Services/responses/ErrorTemplate";
import { BadRequestException } from "../../../Exceptions/badRequest";
import { Messages } from "../../../../Services/responses/Messages";
import { BadServerException } from "../../../Exceptions/badServer";

export async function resetPasswordHandler (req: Request, res: Response , next : NextFunction)
{
    try {
        const passwordResetBody  = req.body as  PasswordResetBody

        //check if user already exist 
        const userTarget = await findUserBy({email : passwordResetBody.email})
        if(!userTarget){
            return res.status(ResStatus.BAD_REQUEST).json(errorResponseTemplate(
                new BadRequestException(Messages.USER_NOT_FOUND 
                    , ErrorCode.USER_NOT_FOUND
                    ,{isPasswordUpdated : false})
            ))
        }
        //

        //if password amd repeated password not the same
        if(passwordResetBody.password != passwordResetBody.repeatPassword){           
            return res.status(ResStatus.BAD_REQUEST).json(errorResponseTemplate(
                new BadRequestException(Messages.PASS_NOT_R_PASS 
                    , ErrorCode.PASSWORD_NOT_REPEATED_PASSWORD
                    ,{isPasswordUpdated : false})
            ))
        }
        //

        //hash password
        const salt = await bcrypt.genSalt(10)
        const hashedPassword = await bcrypt.hash(passwordResetBody.password , salt)
        //

        await resetPassword({password : hashedPassword}
            , passwordResetBody.email)

        return res.json({
            isPasswordUpdated : true,
            message : Messages.PASSWORD_UPDATED
        })
        
    } catch (error) {
        console.log(error);        
        return res.status(ResStatus.I_SERVER_ERROR).json(errorResponseTemplate(
            new BadServerException(Messages.SERVER_ERROR 
                , ErrorCode.SERVER_ERROR
                ,{isPasswordUpdated : false , error})
        ))
    }
}

