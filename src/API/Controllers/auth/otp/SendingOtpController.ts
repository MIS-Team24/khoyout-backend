import { generateOTP } from "../../../../Services/generateOTP";
import { OtpEmailStructure } from "../../../../Services/htmlEmailStructures/OtpEmailStructures";
import { sendEmail } from "../../../../Services/sendEmail";
import { addNewOtp } from "../../../Models/OtpModel";
import { findUserByEmail } from "../../../Models/UserModel";
import { EmailBody } from "../../../types/auth/auth";
import { NextFunction, Request, Response } from "express";
import { generateToken } from "../../../../Services/generateToken";
import { BadRequestException } from "../../../Exceptions/badRequest";
import { ErrorCode } from "../../../Exceptions/main";

//recieve the email target to send an otp 
export async function OtpSentToEmailHandler(req: Request, res: Response , next : NextFunction) {
    
    const emailBody = req.body as EmailBody;

    //check if user already exist 
    const user = await findUserByEmail(emailBody.email)
    if(!user){
        next(new BadRequestException("This user is not exist!" 
        , ErrorCode.USER_NOT_FOUND , {
            isOtpSent : false,
            success: false
        }))
    }
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
                isOtpSent : success,
                success   : false,
                message   : "Not able to send email!, Make sure that your email is working!"
            }
        })
    }

    res.json({
        Otp : {
            isOtpSent : true,
            success : true,
            keyVal : newOtp.id
        }
    })
}