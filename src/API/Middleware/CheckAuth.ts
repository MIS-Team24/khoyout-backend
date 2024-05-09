import { NextFunction , Request , Response } from "express"
import { ErrorCode, ResStatus } from "../Exceptions/main"
import { errorResponseTemplate } from "../../Services/responses/ErrorTemplate"
import { Messages } from "../../Services/responses/Messages"
import { BadAuthonticationException } from "../Exceptions/badAuthontication"
import { BadRequestException } from "../Exceptions/badRequest"

export const checkIfAuthonticated = (req : Request , res : Response , next : NextFunction) => {
    if(!req.isAuthenticated()){
        return res.status(ResStatus.UNAUTHORIZED).json(errorResponseTemplate(
            new BadAuthonticationException(Messages.USER_NOT_AUTHONTICATED 
                , ErrorCode.USER_NOT_AUTHONTICATED
                , {authonticated:false})
        ))
    }

    next()
}

export const checkIfNotAuthonticated = (req : Request , res : Response , next : NextFunction) => {
    if(req.isAuthenticated()){
        return res.status(ResStatus.BAD_REQUEST).json(errorResponseTemplate(
            new BadRequestException(Messages.USER_ALREADY_AUTHONTICATED 
                , ErrorCode.USER_ALREADY_AUTHONTICATED
                , {authonticated:true})
        ))
    }
    
    next()
}