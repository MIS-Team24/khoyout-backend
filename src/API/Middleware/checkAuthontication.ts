import { NextFunction , Request , Response } from "express"

export const checkAuthontication = (req:Request , res : Response , next : NextFunction) => {
    if(!req.isAuthenticated()){
        return res.json({authonticated:false})
    }
    next()
}