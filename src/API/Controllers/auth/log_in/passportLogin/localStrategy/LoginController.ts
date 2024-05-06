import { Request, Response , NextFunction } from "express";
import passport from 'passport';
import { initializePassport } from "../../../../../../Services/passportAuth/passportLocalStrategy";
import { UserBody } from "../../../../../types/auth/auth";

initializePassport(passport)

export const localLoginHandler = (req:Request , res : Response , next : NextFunction) => {
    return passport.authenticate('local', (error : any , user : any , info: any )=>{
        if(error){
            console.log(error);
            return res.json({
                isLogged:false,
                error:error.message
            })
        }        
        if(!user){           
            return res.json({
                isLogged:false,
                message:'No user found!'
            })
        } 
        
        req.logIn(user , (error)=>{
          if(error){
            console.log(error);
            return res.json({
                isLogged:false,
                error:error.message
            })
          }

            //the user form returned according to the frontent desire
            let userReturnedToFront : UserBody = {
                id : user?.id,
                email: user?.id,
                emailActivated:user?.emailActivated,
                createdAt : user?.createdAt,
                fullName: user?.fullName
            }
            //

          return res.json({
            isLogged:true,
            message:'User has logged successfully',
            user : userReturnedToFront
        })
        })
    })(req,res,next)
}

export const passportLocal = passport