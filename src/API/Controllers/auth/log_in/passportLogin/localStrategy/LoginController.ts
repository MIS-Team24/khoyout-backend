import { Request, Response , NextFunction } from "express";
import passport from 'passport';
import { initializePassport } from "../../../../../../Services/passportAuth/passportLocalStrategy";
import { UserBody } from "../../../../../types/auth";
import { ErrorCode, ResStatus } from "../../../../../Exceptions/main";
import { Messages } from "../../../../../../Services/responses/Messages";
import { ErrorResponseType, errorResponseTemplate } from "../../../../../../Services/responses/ErrorTemplate";
import { BadRequestException } from "../../../../../Exceptions/badRequest";

initializePassport(passport)

export const localLoginHandler = (req:Request , res : Response , next : NextFunction) => {
    return passport.authenticate('local', (error : any , user : any , info: any )=>{
        if(error){     
            let errRsponse  = error as  ErrorResponseType        
            return res.status(errRsponse.error.errorStatus).json(error)
        }    

        if(!user){         
            return res.status(ResStatus.BAD_REQUEST).json(errorResponseTemplate(
                new BadRequestException(Messages.USER_NOT_FOUND 
                    , ErrorCode.USER_NOT_FOUND)                   
            ))
        } 
        
        req.logIn(user , (error)=>{
            if(error){
                let errRsponse  = error as  ErrorResponseType        
                return res.status(errRsponse.error.errorStatus).json(error)     
            }

            //the user form returned according to the frontent desire
            let userReturnedToFront : UserBody = {
                email: user?.email,
                emailActivated:user?.emailActivated,
                createdAt : user?.createdAt,
                fullName: user?.fullName,
                phone : user?.phone
            }
            //

            return res.json({
                        message: Messages.USER_LOGGED_IN,
                        user : userReturnedToFront
                    })
        })
    })(req,res,next)
}

export const passportLocal = passport