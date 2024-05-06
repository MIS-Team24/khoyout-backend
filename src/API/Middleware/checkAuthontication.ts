import { NextFunction , Request , Response } from "express"
import { ErrorCode, ErrorStatus } from "../Exceptions/main"

export const checkIfAuthonticated = (req : Request , res : Response , next : NextFunction) => {
    if(!req.isAuthenticated()){
        const responeError = {
            error : {
                message : "User is not authonticated"  ,
                errorCode : ErrorCode.USER_NOT_AUTHONTICATED,
                errorStatus : ErrorStatus.UNAUTHORIZED,
                details : { authonticated:false, isLoggedIn : false}                            
            }
        }                   
        return res.json(responeError) 
    }

    next()
}

export const checkIfNotAuthonticated = (req : Request , res : Response , next : NextFunction) => {
    if(req.isAuthenticated()){
        const responeError = {
            error : {
                message : "User is already authonticated"  ,
                errorCode : ErrorCode.USER_ALREADY_AUTHONTICATED,
                errorStatus : ErrorStatus.BAD_REQUEST,
                details : { authonticated : true, isLoggedIn : true}                            
            }
        }                   
        return res.json(responeError) 
    }
    
    next()
}