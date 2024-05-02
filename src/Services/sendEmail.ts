import { MailOptions } from "nodemailer/lib/sendmail-transport";
import { transporter } from "./nodemailer";
import { Response } from "express";

export const sendEmail = async (mailOptions : MailOptions , res : Response) => {
    await transporter.sendMail(mailOptions , (error , info)=>{
        if(error) res.status(400).json({success : false , details : error})
    })     
    return true
}

/*
    example for mailOption object here
    {
        from    :   process.env.OWNER_USER_APP,
        to      :   user_email,
        subject :  "verify your email",
        text    :  `please inter this otp to verify your email ${otpServer}`,
        html    :  <h1>Welcome to our service</h1>
    } 
*/