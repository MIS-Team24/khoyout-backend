import { Request, Response } from "express";
import { UserBody } from "../../types/auth/auth";
import { deleteUser } from "../../Models/UserModel";
import { ErrorCode, ResStatus } from "../../Exceptions/main";
import { errorResponseTemplate } from "../../../Services/responses/ErrorTemplate";
import { BadRequestException } from "../../Exceptions/badRequest";
import { Messages } from "../../../Services/responses/Messages";

export const deleteUserAccount = async (req : Request , res : Response) => {
    const user = req?.user as UserBody
    const userDeleted = await deleteUser({id : user?.id})
    if(!userDeleted){
        return res.status(ResStatus.BAD_REQUEST).json(errorResponseTemplate(
            new BadRequestException(Messages.USER_NOT_FOUND 
                , ErrorCode.USER_NOT_FOUND)
        ))     
    }

    req.logout((error) => {
        if (error) {               
            return res.status(ResStatus.OK).json({
                message: Messages.USER_DELETED,
                isUserAccountDeleted : true,
                errorLogout : error
            })
        }

        return res.status(ResStatus.OK).json({
            message: Messages.USER_DELETED,
            isUserAccountDeleted : true
        })
    })
}