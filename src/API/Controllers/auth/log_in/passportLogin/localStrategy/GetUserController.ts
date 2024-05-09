import { Request, Response } from "express";
import { ResStatus } from "../../../../../Exceptions/main";

//get user after logging if frontend want at any time
//get authonticated user
export const getUserHandler = async (req : Request , res : Response) => {
    if(req?.user){
        return res.json({authonticated: true , user : req?.user}) //200 default status
    }else{
        return res.status(ResStatus.UNAUTHORIZED)
        .json({authonticated: false , user : null})
    }   
}