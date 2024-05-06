import { Request, Response , NextFunction } from "express";
import passport from 'passport';
import { initializePassport } from "../../../../../../Services/passportAuth/passportLocalStrategy";
import { UserBody } from "../../../../../types/auth/auth";
import { ErrorCode, ErrorStatus } from "../../../../../Exceptions/main";

initializePassport(passport)

export const localLoginHandler = (req:Request , res : Response , next : NextFunction) => {
    return passport.authenticate('local', (error : any , user : any , info: any )=>{
        if(error){
            console.log(error);     
            return res.json({error})             
        }    

        if(!user){        
            return res.json({
                error : {
                    message : "User not found",
                    errorCode : ErrorCode.USER_NOT_FOUND,
                    errorStatus : ErrorStatus.BAD_REQUEST,
                    details : {isLoggedIn : false , success : false}  
                }                            
            })   
        } 
        
        req.logIn(user , (error)=>{
            if(error){
                console.log(error);
                return res.json({error})      
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
                message:'User has logged successfully',
                user : userReturnedToFront
            })
        })
    })(req,res,next)
}

export const passportLocal = passport