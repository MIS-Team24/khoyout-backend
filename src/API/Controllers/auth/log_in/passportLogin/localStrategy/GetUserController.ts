import { Request, Response } from "express";
import { ErrorStatus } from "../../../../../Exceptions/main";

//get user after logging if frontend want at any time
//get authonticated user
export const getUserHandler = async (req : Request , res : Response) => {
    if(req.user){
        return res.json({isLoggedIn : true , authonticated: true , user : req.user}) 
    }else{
        return res.status(ErrorStatus.UNAUTHORIZED)
        .json({isLoggedIn : false , authonticated: false , user : null})
    }   
}