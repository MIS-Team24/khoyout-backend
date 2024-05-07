import { Request, Response } from "express";

//controller for handling protected routes 
//also there is a middleware controller in the midlleware folder
export const isUserAuthonticatedHandler = (req:Request , res : Response) => {
    if(req.isAuthenticated()){
        return res.json({isLoggedIn : true , authonticated: true})
    }
    return res.json({isLoggedIn : false , authonticated: false})
}