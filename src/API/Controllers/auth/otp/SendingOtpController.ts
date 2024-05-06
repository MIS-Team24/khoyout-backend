import { generateOTP } from "../../../../Services/generateOTP";
import { OtpEmailStructure } from "../../../../Services/htmlEmailStructures/OtpEmailStructures";
import { sendEmail } from "../../../../Services/sendEmail";
import { addNewOtp } from "../../../Models/OtpModel";
import { findUserByEmail } from "../../../Models/UserModel";
import { EmailBody, UserBody } from "../../../types/auth/auth";
import { Request, Response } from "express";
import { generateToken } from "../../../../Services/generateToken";

//recieve the email target to send an otp 
export async function OtpSentToEmailHandler(req: Request, res: Response) {
    
    const emailBody = req.body as EmailBody;

    //check if user already exist 
    const user = await findUserByEmail(emailBody.email)
    if(!user) res.json({error : "This user is not exist!"});
    //

    //generate a random Otp from 4 numbers
    const otpServer = generateOTP(4)
    //

    //create token to control the validtion time of the otp
    const validtionPeriod = generateToken({} , "5m");
    //
    
    //save it
    const newOtp = await addNewOtp({
        email : emailBody.email,
        code  : otpServer,
        expiredAt : validtionPeriod
    })
    //

    //send email
    const success = await sendEmail({
        from    :   process.env.OWNER_USER_APP,
        to      :   emailBody.email,
        subject :   "Verify your email",
        text    :   "Verify your email",
        html    :   OtpEmailStructure(otpServer)
    } , res)
    //
    
    if(!success){
        res.json({
            Otp : {
                success,
                message : "There something wrong with sending email try later!"
            }
        })
    }

    res.json({
        Otp : {
            success,
            keyVal : newOtp.id
        }
    })
}