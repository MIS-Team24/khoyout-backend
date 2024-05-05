import { Request, Response , NextFunction} from "express";
import { RegisterBody, UserBody } from "../../../types/auth/auth";
import { addUser, findUserByEmail } from "../../../Models/UserModel";
import * as bcrypt from "bcrypt"
import 'dotenv/config';
import { generateOTP } from "../../../../Services/generateOTP";
import { sendEmail } from "../../../../Services/sendEmail";
import { OtpEmailStructure } from "../../../../Services/htmlEmailStructures/OtpEmailStructures";
import { addNewOtp } from "../../../Models/OtpModel";
import { generateToken } from "../../../../Services/generateToken";

export async function RegisterHandler (req: Request, res: Response , next : NextFunction)
{
    const registerBody = req.body as RegisterBody;

    //check if user already exist 
    const userTarget = await findUserByEmail(registerBody.email)
    if(userTarget) res.json({error : "This user is already exist"});
    //

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
    //

    //send otp and save it in the database
    //generate a random Otp from 4 numbers
    const otpServer = generateOTP(4)
    //

    //create token to control the validtion time of the otp
    const validtionPeriod = generateToken({} , "5m");
    //
    
    //save it
    const newOtp = await addNewOtp({
        email : registerBody.email,
        code  : otpServer,
        expiredAt : validtionPeriod
    })
    //

    //send it
    const success = await sendEmail({
        from    :   process.env.OWNER_USER_APP,
        to      :   registerBody.email,
        subject :   "Verify your email",
        text    :   "Verify your email",
        html    :   OtpEmailStructure(otpServer)
    } , res)
    //
    //

    if(!success){
        res.json({
            message : "User has been saved successfuly!",
            Otp : {
                success,
                message : "There something wrong with sending email try later!"
            },
            user
        })
    }
    
    res.json({
        message : "User has been saved successfuly!",
        Otp : {
            success,
            keyVal : newOtp.id
        },
        user
    });
}

