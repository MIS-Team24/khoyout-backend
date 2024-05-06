import { Request, Response , NextFunction } from "express";
import passport from 'passport';
import { initializePassport } from "../../../../../../Services/passportAuth/passportLocalStrategy";

initializePassport(passport)

export const localLoginHandler = (req:Request , res : Response , next : NextFunction) => {
    return passport.authenticate('local',(error : any , user : any , info: any )=>{
        if(error){
            console.log(error);
            return res.json({
                errorLocate:'user',
                isLogged:false,
                error:error.message
            })
        }        
        if(!user){           
            return res.json({
                errorLocate:'user',
                isLogged:false,
                message:'No user found!'
            })
        } 
        
        req.logIn(user , (error)=>{
          if(error){
            console.log(error);
            return res.json({
                errorLocate:'server',
                isLogged:false,
                error:error.message
            })
          }

          return res.json({
            isLogged:true,
            message:'User has logged successfully',
            user
        })
        })
    })(req,res,next)
}

export const passportLocal = passport