import { NextFunction, Request, Response } from "express";
import { BadServerException } from "../../../../../Exceptions/badServer";
import { ErrorCode } from "../../../../../Exceptions/main";

export const logoutHandler = async (req : Request , res : Response ,  next : NextFunction) => {
    if(req.user){
        req.logout((err) => {
            if (err) { 
                return next(err); 
            }
            return res.json({
                success : true, 
                message:"user loged out successfully"
            })
        });
    }else{
        return res.json({
            success : false, 
            message:"User is already logged out!"
        })
    }   
}