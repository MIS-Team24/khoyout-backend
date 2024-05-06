import { NextFunction, Request, Response } from "express";
import { BadServerException } from "../../../../../Exceptions/badServer";
import { ErrorCode } from "../../../../../Exceptions/main";
import { BadAuthonticationException } from "../../../../../Exceptions/badAuthontication";

export const logoutHandler = async (req : Request , res : Response ,  next : NextFunction) => {
    if(req.user){
        req.logout((err) => {
            if (err) { 
                // next(new BadServerException("Internal server error!" 
                //     , ErrorCode.SERVER_ERROR , err)); 
                res.json({
                    success : false, 
                })
            }

            res.json({
                success : true, 
                message:"user logged out successfully"
            })
        })
    }else{
        res.json({
            success : false, 
        })
        // next(new BadAuthonticationException("User not authonticated!" 
        //     , ErrorCode.USER_NOT_AUTHONTICATED , {isAuth : false})); 
    }   
}