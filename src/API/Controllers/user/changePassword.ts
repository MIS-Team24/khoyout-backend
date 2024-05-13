import { Request, Response } from "express";
import { UserBody } from "../../types/auth";
import { deleteAllUserSessionsFromDb, deleteUserDbSession, updateUser } from "../../Models/UserModel";
import { ErrorCode , ResStatus } from "../../Exceptions/main";
import { errorResponseTemplate } from "../../../Services/responses/ErrorTemplate";
import { BadRequestException } from "../../Exceptions/badRequest";
import { Messages } from "../../../Services/responses/Messages";
import { ChangePasswordBody } from "../../types/user";
import * as bcrypt from "bcrypt"

export const changeUserPassword = async (req: Request, res : Response) => {
    const user = req?.user as UserBody
    const changePasswordBody  = req.body as ChangePasswordBody
    
    //if password amd repeated password not the same
    if(changePasswordBody.password != changePasswordBody.repeatPassword){           
        return res.status(ResStatus.BAD_REQUEST).json(errorResponseTemplate(
            new BadRequestException(Messages.PASS_NOT_R_PASS 
                , ErrorCode.PASSWORD_NOT_REPEATED_PASSWORD
                ,{isPasswordUpdated : false})
        ))
    }
    //

    //hash password
    const salt = await bcrypt.genSalt(10)
    const hashedPassword = await bcrypt.hash(changePasswordBody.password , salt)
    //

    const userUpdated = await updateUser({id : user?.id} , {password : hashedPassword})
    if(!userUpdated){
        return res.status(ResStatus.BAD_REQUEST).json(errorResponseTemplate(
            new BadRequestException(Messages.USER_NOT_FOUND 
                , ErrorCode.USER_NOT_FOUND)
        ))  
    }


    const userId = user?.id;
    if (userId) {
        const success = await deleteAllUserSessionsFromDb(userId);

        if (success) {               
            return res.status(ResStatus.OK).json({
                message: Messages.PASSWORD_UPDATED,
                isPasswordUpdated : true,
            })
        } else {
            return res.status(ResStatus.OK).json({
                message: Messages.INCORRECT_PASSWORD,
                isPasswordUpdated : false,
            })
        }
    }
}