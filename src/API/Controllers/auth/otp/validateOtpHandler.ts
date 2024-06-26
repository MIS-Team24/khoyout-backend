import {Response , Request} from "express";
import { Messages } from "../../../../Services/responses/Messages";

export async function validateOtpHandler (req: Request , res : Response)
{
    res.json({
        Otp :{
            isOtpValid : true, 
            message : Messages.OTP_VALID
        }
    })  
}