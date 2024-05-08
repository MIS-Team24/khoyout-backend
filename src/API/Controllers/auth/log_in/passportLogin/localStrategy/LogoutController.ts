import { NextFunction, Request, Response } from "express";
import { ErrorCode, ResStatus } from "../../../../../Exceptions/main";
import { errorResponseTemplate } from "../../../../../../Services/responses/ErrorTemplate";
import { Messages } from "../../../../../../Services/responses/Messages";
import { BadServerException } from "../../../../../Exceptions/badServer";
import { BadAuthonticationException } from "../../../../../Exceptions/badAuthontication";

export const logoutHandler = async (req : Request , res : Response ,  next : NextFunction) => {
    if(req.user){
        req.logout((error) => {
            if (error) {               
                return res.status(ResStatus.I_SERVER_ERROR).json(errorResponseTemplate(
                    new BadServerException(Messages.SERVER_ERROR 
                        , ErrorCode.SERVER_ERROR
                        ,{error , authonticated : false})
                ))
            }

            return res.json({
                authonticated : true,
                message: Messages.USER_LOGGED_OUT
            })
        })
    }else{
        return res.status(ResStatus.UNAUTHORIZED).json(errorResponseTemplate(
            new BadAuthonticationException(Messages.USER_NOT_AUTHONTICATED 
                , ErrorCode.USER_NOT_AUTHONTICATED
                ,{ authonticated : false})
        ))
    }   
}