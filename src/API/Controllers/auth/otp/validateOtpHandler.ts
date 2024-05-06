import {Response , Request} from "express";

export async function validateOtpHandler (req: Request , res : Response)
{
    res.json({
        Otp :{
            success : true , 
            message : "Otp is correct!",
        }
    })  
}