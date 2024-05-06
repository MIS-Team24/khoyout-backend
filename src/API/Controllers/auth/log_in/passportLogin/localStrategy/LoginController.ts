import { Request, Response , NextFunction } from "express";
import passport from 'passport';
import { initializePassport } from "../../../../../../Services/passportAuth/passportLocalStrategy";
import { UserBody } from "../../../../../types/auth/auth";
import { BadServerException } from "../../../../../Exceptions/badServer";
import { ErrorCode, ErrorStatus } from "../../../../../Exceptions/main";
import { BadRequestException } from "../../../../../Exceptions/badRequest";

initializePassport(passport)

export const localLoginHandler = (req:Request , res : Response , next : NextFunction) => {
    return passport.authenticate('local', (error : any , user : any , info: any )=>{
        if(error){
            console.log(error);            
            return res.json({
                isLoggedIn:false,
                error:error
            })
        }        
        if(!user){           
            return res.json({
                isLoggedIn:false,
                message:'No user found!'
            })
        } 
        
        req.logIn(user , (error)=>{
          if(error){
            console.log(error);
            return res.json({
                isLoggedIn:false,
                error:error
            })
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
            message:'User has logged successfully',
            user : userReturnedToFront
        })
        })
    })(req,res,next)
}



// export const localLoginHandler = (req:Request , res : Response , next : NextFunction) => {
//     return passport.authenticate('local', (error : any , user : any , info: any )=>{
//         if(error){
//             console.log(error);     
//             return res.json({
//                 error : {
//                     message : "Internal server error!" ,
//                     errorCode : ErrorCode.SERVER_ERROR,
//                     errorStatus : ErrorStatus.SERVER_ERROR,
//                     details : {
//                         isLoggedIn : false , 
//                         success : false,
//                         error
//                     }  
//                 }                            
//             })             
//         }    

//         if(!user){        
//             return res.json({
//                 error : {
//                     message : "User not found",
//                     errorCode : ErrorCode.USER_NOT_FOUND,
//                     errorStatus : ErrorStatus.BAD_REQUEST,
//                     details : {isLoggedIn : false , success : false}  
//                 }                            
//             })   
//         } 
        
//         req.logIn(user , (error)=>{
//             if(error){
//                 console.log(error);
//                 return res.json({
//                     error : {
//                         message : "Internal server error!" ,
//                         errorCode : ErrorCode.SERVER_ERROR,
//                         errorStatus : ErrorStatus.SERVER_ERROR,
//                         details : {
//                             isLoggedIn : false , 
//                             success : false,
//                             error
//                         }  
//                     }                            
//                 })      
//             }

//         //the user form returned according to the frontent desire
//         let userReturnedToFront : UserBody = {
//             id : user?.id,
//             email: user?.id,
//             emailActivated:user?.emailActivated,
//             createdAt : user?.createdAt,
//             fullName: user?.fullName,
//             phone : user?.phone
//         }
//         //

//         return res.json({
//                 isLoggedIn:true,
//                 success:true,
//                 message:'User has logged successfully',
//                 user : userReturnedToFront
//             })
//         })
//     })(req,res,next)
// }

export const passportLocal = passport