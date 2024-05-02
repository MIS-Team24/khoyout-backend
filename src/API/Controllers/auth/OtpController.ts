import { generateOTP } from "../../../Services/generateOTP";
import { sendEmail } from "../../../Services/sendEmail";
import { isUserExist } from "../../Models/UserModel";
import { EmailBody } from "../../types/auth/auth";
import { Request, Response } from "express";
import { nodemailerResult } from "../../types/responsesJson/generalResponse";

//recieve the email target to send and email
export async function OtpSentToEmailHandler(req: Request, res: Response) {
    
    const registerBody = req.body as EmailBody;

    //check if user already exist 
    const userExistence : boolean = await isUserExist(registerBody.email)
    if(userExistence) res.json({error : "This user is already exist"});
    //

    //generate a random Otp from 4 numbers
    const otpServer = generateOTP(4)
    //

    //send email
    const result = sendEmail({
        from    :   process.env.OWNER_USER_APP,
        to      :   registerBody.email,
        subject :   "Verify your email",
        text    :   "Verify your email",
        html    :   `<h2>Welcome to our service</h2>
                    <p>Please, inter this otp to verify your email.</p>
                    <h1>${otpServer}</h1>`
    }) as nodemailerResult
    //

    res.json(result)
}