import { Request, Response , NextFunction } from "express";
import passport from 'passport';
import { initializePassport } from "../../../../../Services/passportAuth/passportLocalStrategy";

initializePassport(passport)

export const getUserAfterLogged = async (req : Request , res : Response) => {
    //get authonticated user
    if(req.user){
        return res.json({user:req.user})
    }else{
        return res.json({user:null})
    }   
}

export const logoutProcess = async (req : Request , res : Response) => {
    if(req.user){
        req.logOut((error)=>{
            if(error) return res.json({error})
            req.session.destroy((error)=>{
                return res.json({error})
            })
    
            return res.json({
                success : true, 
                message:"user loged out successfully"
            })
        }) 
    }else{
        return res.json({
            success : false, 
            message:"User is already logged out!"
        })
    }  
}

export const localAuthonticateUser = (req:Request , res : Response , next : NextFunction) => {
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

export const isUserAuthonticated = (req:Request , res : Response , next : NextFunction) => {
    if(req.isAuthenticated()){
        return res.json({authonticated:true})
    }
    return res.json({authonticated:false})
}

export const passportLocal = passport
