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
import { ErrorCode } from "../../../Exceptions/main";
import { BadRequestException } from "../../../Exceptions/badRequest";
import { Messages } from "../../../../Services/responses/Messages";
import { errorResponseTemplate } from "../../../../Services/responses/ErrorTemplate";

export async function RegisterHandler (req: Request, res: Response , next : NextFunction)
{
    const registerBody = req.body as RegisterBody;

    //check if user already exist 
    const userTarget = await findUserByEmail(registerBody.email)
    if(userTarget){
        return res.json(errorResponseTemplate(
            new BadRequestException(Messages.USER_EXIST , ErrorCode.USER_ALREADY_EXIST
                ,{isUserSaved : false , success : false})
        ))
    }
    //

    //if password amd repeated password not the same
    if(registerBody.password != registerBody.repeatPassword){
        return res.json(errorResponseTemplate(
            new BadRequestException(Messages.PASS_NOT_R_PASS 
                , ErrorCode.PASSWORD_NOT_REPEATED_PASSWORD
                ,{isUserSaved : false , success : false})
        ))
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

    //the user form returned according to the frontent desire
    let userReturnedToFront : UserBody = {
        id : user?.id,
        email: user?.id,
        emailActivated:user?.emailActivated,
        createdAt : user?.createdAt,
        fullName: user?.fullName,
        phone : user?.phone
    }
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
        html    :   OtpEmailStructure(otpServer , "5m")
    } , res)
    //
    //

    if(!success){
        return res.json({
            message : Messages.USER_SAVED,
            isUserSaved : true,
            success : true,
            user : userReturnedToFront,
            Otp : {    
                success : false,           
                isOtpSent : success,
                message : Messages.NOT_ABLE_SEND_EMAIL
            }            
        })
    }
    
    return res.json({
        message : Messages.USER_SAVED,
        isUserSaved : true,
        success : true,
        user : userReturnedToFront,        
        Otp : {
            success : true, 
            isOtpSent : success,
            keyVal : newOtp.id
        }       
    });
}

