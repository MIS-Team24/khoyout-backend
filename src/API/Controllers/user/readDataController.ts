import { Request, Response } from "express";
import { UserBody } from "../../types/auth";
import { readUser } from "../../Models/UserModel";
import { ErrorCode , ResStatus } from "../../Exceptions/main";
import { errorResponseTemplate } from "../../../Services/responses/ErrorTemplate";
import { BadRequestException } from "../../Exceptions/badRequest";
import { Messages } from "../../../Services/responses/Messages";

export const readUserData = async (req : Request , res : Response) => {
    const user = req?.user as UserBody
    const userData = await readUser({id : user?.id})
    if(!userData){
        return res.status(ResStatus.BAD_REQUEST).json(errorResponseTemplate(
            new BadRequestException(Messages.USER_NOT_FOUND 
                , ErrorCode.USER_NOT_FOUND)
        ))  
    }
    return res.status(ResStatus.OK).json({
        user : userData
    })
}