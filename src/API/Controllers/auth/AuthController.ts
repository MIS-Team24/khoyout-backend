import { Request, Response } from "express";
import { LoginBody, RegisterBody } from "../../types/auth/auth";
import { addUser, isUserExist } from "../../Models/UserModel";
import * as bcrypt from "bcrypt"
import 'dotenv/config';

export function loginHandler(req: Request, res: Response)
{
    const loginBody = req.body as LoginBody;

    res.status(200).send("login");
}

export async function RegisterHandler (req: Request, res: Response)
{
    const registerBody = req.body as RegisterBody;

    // //check if user already exist 
    // const userExistence : boolean = await isUserExist(registerBody.email)
    // if(userExistence) res.json({error : "This user is already exist"});
    // //

    //if password amd repeated password not the same
    if(registerBody.password != registerBody.repeatPassword){
        res.json({error : "Password and repeated password are not the same!"})
    }
    //

    //add this user to database
    //hash password
    const salt = await bcrypt.genSalt(10)
    const hashedPassword = await bcrypt.hash(registerBody.password , salt)
    //

    const newUser = {
        email : registerBody.email,
        fullName : registerBody.fullName,
        password: hashedPassword
    }

    const user = await addUser(newUser)

    res.status(200).json({message : "User has been added successfuly!" , user});
    //

    
}

