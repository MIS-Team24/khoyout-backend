import { Request, Response } from "express";
import { ResStatus } from "../../../../../Exceptions/main";
import { getUserAvatarURLById } from "../../../../../Models/UserModel";

//get user after logging if frontend want at any time
//get authenticated user
export const getUserHandler = async (req : Request , res : Response) => {
    if(req?.user){
        const userObject = req.user.id;
        const avatarURL = await getUserAvatarURLById(userObject);
        return res.json({authenticated: true , user: {...req?.user, avatarURL: avatarURL?? null}}); //200 default status
    }else{
        return res.status(ResStatus.UNAUTHORIZED)
        .json({authenticated: false , user : null})
    }   
}