import { NextFunction, Request, Response } from "express";
import { ErrorCode, ErrorStatus } from "../../../../../Exceptions/main";

export const logoutHandler = async (req : Request , res : Response ,  next : NextFunction) => {
    if(req.user){
        req.logout((error) => {
            if (error) { 
                const responeError = {
                    error : {
                        message : "Internal server error!",
                        errorCode : ErrorCode.SERVER_ERROR,
                        errorStatus : ErrorStatus.SERVER_ERROR,
                        details : {error , isAuth : false}                            
                    }
                }
                return res.json(responeError)
            }

            return res.json({
                success : true, 
                isAuth : true,
                message:"user logged out successfully"
            })
        })
    }else{
        const responeError = {
            error : {
                message : "User not authonticated!",
                errorCode : ErrorCode.USER_NOT_AUTHONTICATED,
                errorStatus : ErrorStatus.UNAUTHORIZED,
                details : {isAuth : false}                            
            }
        }
        return res.json(responeError)
    }   
}