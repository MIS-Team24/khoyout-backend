import { NextFunction , Request , Response } from "express"

export const checkIfAuthonticated = (req : Request , res : Response , next : NextFunction) => {
    if(!req.isAuthenticated()){
        return res.json({authonticated:false})
    }
    next()
}

export const checkIfNotAuthonticated = (req : Request , res : Response , next : NextFunction) => {
    if(req.isAuthenticated()){
        return res.json({authonticated:true})
    }
    next()
}