import { Request, Response } from "express";
import * as jwt from "jsonwebtoken"

export const verifyTokenHandler = (req: Request , res : Response) => {
    const token = req.cookies.khoyout_user;
    if(token){
        jwt.verify(token, 'net ninja secret', async (err: any, decodedToken: any) => {
            if (err) {
                res.json({success : false , message : "this token is not valid!"})               
            } else {               
                res.json({success : true , message : "this token is valid!"})
            }
        });
    }
    res.json({success : false , message : "this token is not valid!"})               
}