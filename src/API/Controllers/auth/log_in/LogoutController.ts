import { Request, Response } from "express";

export const logoutHandler = (req : Request , res : Response) => {
    res.clearCookie("khoyout-user").json({
        success : true,
        message : "user has logged out successfully!"
    })
}