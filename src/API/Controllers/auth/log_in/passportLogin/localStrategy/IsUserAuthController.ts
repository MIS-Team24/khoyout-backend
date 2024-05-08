import { Request, Response } from "express";
import { ResStatus } from "../../../../../Exceptions/main";

//controller for handling protected routes 
//also there is a middleware controller in the midlleware folder
export const isUserAuthonticatedHandler = (req:Request , res : Response) => {
    if(req.isAuthenticated()){
        return res.json({authonticated: true})
    }
    return res.status(ResStatus.UNAUTHORIZED).json({authonticated: false})
}