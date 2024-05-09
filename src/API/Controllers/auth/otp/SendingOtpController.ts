import { generateOTP } from "../../../../Services/generateOTP";
import { OtpEmailStructure } from "../../../../Services/htmlEmailStructures/OtpEmailStructures";
import { sendEmail } from "../../../../Services/sendEmail";
import { addNewOtp } from "../../../Models/OtpModel";
import { findUserBy } from "../../../Models/UserModel";
import { EmailBody } from "../../../types/auth/auth";
import { NextFunction, Request, Response } from "express";
import { generateToken } from "../../../../Services/generateToken";
import { ErrorCode, ResStatus } from "../../../Exceptions/main";
import { errorResponseTemplate } from "../../../../Services/responses/ErrorTemplate";
import { BadRequestException } from "../../../Exceptions/badRequest";
import { Messages } from "../../../../Services/responses/Messages";

//recieve the email target to send an otp 
export async function OtpSentToEmailHandler(req: Request, res: Response , next : NextFunction) {
    
    const emailBody = req.body as EmailBody;

    //check if user already exist 
    const user = await findUserBy({email : emailBody.email})
    if(!user){
        return res.status(ResStatus.BAD_REQUEST).json(errorResponseTemplate(
            new BadRequestException(Messages.USER_NOT_FOUND 
                , ErrorCode.USER_NOT_FOUND
                ,{isOtpSent : false})
        ))
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
        html    :   OtpEmailStructure(otpServer , "5")
    } , res)
    //
    
    if(!success){
        return res.status(ResStatus.BAD_REQUEST).json(errorResponseTemplate(
            new BadRequestException(Messages.NOT_ABLE_SEND_EMAIL 
                , ErrorCode.NOT_ABLE_SEND_EMAIL
                ,{isOtpSent : false})
        ))
    }

    return res.json({
        Otp : {
            isOtpSent : true,
            keyVal : newOtp.id
        }
    })
}