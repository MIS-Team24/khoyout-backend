import { generateOTP } from "../../../Services/generateOTP";
import { OtpEmailStructure } from "../../../Services/htmlEmailStructures/OtpEmailStructures";
import { sendEmail } from "../../../Services/sendEmail";
import { isUserExist } from "../../Models/UserModel";
import { EmailBody } from "../../types/auth/auth";
import { Request, Response } from "express";

//recieve the email target to send and otp or any thing to this email
export async function OtpSentToEmailHandler(req: Request, res: Response) {
    
    const registerBody = req.body as EmailBody;

    //check if user already exist 
    const userExistence : boolean = await isUserExist(registerBody.email)
    if(userExistence) res.json({error : "This user is already exist"});
    //

    //generate a random Otp from 4 numbers
    const otpServer = generateOTP(4)
    //

    const success = await sendEmail({
        from    :   process.env.OWNER_USER_APP,
        to      :   registerBody.email,
        subject :   "Verify your email",
        text    :   "Verify your email",
        html    :   OtpEmailStructure(otpServer)
    } , res)
    

    res.json({success , otpServer})
}