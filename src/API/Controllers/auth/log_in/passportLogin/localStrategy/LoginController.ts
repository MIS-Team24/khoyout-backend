import { Request, Response , NextFunction } from "express";
import passport from 'passport';
import { initializePassport } from "../../../../../../Services/passportAuth/passportLocalStrategy";
import { UserBody } from "../../../../../types/auth/auth";
import { ErrorCode } from "../../../../../Exceptions/main";
import { Messages } from "../../../../../../Services/responses/Messages";
import { errorResponseTemplate } from "../../../../../../Services/responses/ErrorTemplate";
import { BadRequestException } from "../../../../../Exceptions/badRequest";

initializePassport(passport)

export const localLoginHandler = (req:Request , res : Response , next : NextFunction) => {
    return passport.authenticate('local', (error : any , user : any , info: any )=>{
        if(error){             
            return res.json(error)
        }    

        if(!user){         
            return res.json(errorResponseTemplate(
                new BadRequestException(Messages.USER_NOT_FOUND 
                    , ErrorCode.USER_NOT_FOUND
                    ,{isLoggedIn : false})
            ))
        } 
        
        req.logIn(user , (error)=>{
            if(error){
                return res.json(error)     
            }

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

        return res.json({
                isLoggedIn:true,
                success:true,
                message: Messages.USER_LOGGED_IN,
                user : userReturnedToFront
            })
        })
    })(req,res,next)
}

export const passportLocal = passport