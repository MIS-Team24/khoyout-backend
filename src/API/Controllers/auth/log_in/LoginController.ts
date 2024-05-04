import { Request, Response } from "express";
import { LoginBody, UserBody } from "../../../types/auth/auth";
import 'dotenv/config';
import { findUserByEmail } from "../../../Models/UserModel";
import * as bcrypt from "bcrypt"
import { generateToken } from "../../../../Services/generateToken";

export async function loginHandler (req: Request, res: Response)
{
    const loginBody = req.body as LoginBody;

    //check if user exist 
    const user = await findUserByEmail(loginBody.email)
    if(!user) res.json({error : "This user not exist!"});
    //

    //compare password
    let isPasswordCorrect = await bcrypt.compare(loginBody.password , user?.password || "");
    if(!isPasswordCorrect) res.json({error : "incorrect password!"})
    //

    const token = generateToken({id : user?.id} , "5m");
    const maxAge = 5 * 24 * 60 * 60 * 1000 //this is 5 days persiod using milliseconds
    let targetUser : UserBody = {
        id : user?.id,
        fullName : user?.fullName,
        email : user?.email,
        phone : user?.phone,
        createdAt : user?.createdAt,
        token
    }
    
    res.cookie('khoyout_user', token, { httpOnly: true, maxAge}).json(targetUser);
}