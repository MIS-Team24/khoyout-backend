import { MailOptions } from "nodemailer/lib/sendmail-transport";
import { transporter } from "./nodemailer";
import { nodemailerResult } from "../API/types/responsesJson/generalResponse";


export const sendEmail = (mailOptions : MailOptions) : nodemailerResult => {
    let result = {} as nodemailerResult

    transporter.sendMail(mailOptions , (error , info)=>{
        if(error) result =  {success : false , details : error}
        result = {success : true , details : info}
    }) 

    return result
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