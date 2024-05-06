const localStrategy = require('passport-local').Strategy
import { PassportStatic } from 'passport'
import {findUserByEmail, findUserById} from '../../API/Models/UserModel'
import bcrypt from 'bcrypt'
import { LoginBody, UserBody } from '../../API/types/auth/auth'
import { BadRequestException } from '../../API/Exceptions/badRequest'
import { ErrorCode, ErrorStatus } from '../../API/Exceptions/main'
import { BadServerException } from '../../API/Exceptions/badServer'

export const initializePassport = (passport : PassportStatic) => {
    passport.use(new localStrategy({ usernameField :'email'}    
    , async (email : string , password : string , done : CallableFunction)=>{       
            const loginBody = {email , password} as LoginBody;
            const user = await findUserByEmail(loginBody.email)  

            //the user form returned according to the frontent desire
            let userReturnedToFront : UserBody = {
                id : user?.id,
                email: user?.id,
                emailActivated:user?.emailActivated,
                createdAt : user?.createdAt,
                fullName: user?.fullName
            }
            //   

            if(!user){
                return done(null , false) //there is no user with this email
            }     

            const isMatch = await bcrypt.compare(loginBody.password , user.password)
            if(isMatch) {
                return done(null , userReturnedToFront)
            }

            const errorRsponse : Partial<BadRequestException> = {      
                message : "Incorrect pasword!" ,
                errorCode : ErrorCode.INCORRECT_PASSWORD,
                errorStatus : ErrorStatus.BAD_REQUEST,
                details : {
                    isLoggedIn : false , 
                    success : false,                    
                }                
            }

            return done(errorRsponse , null)    
        }
    ))

    passport.serializeUser((user : UserBody, done) =>{
        return done(null , user.id)
    })
    
    passport.deserializeUser(async (id : string, done) => {
        try {
            const user = await findUserById(id)

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

            if(!user){      
                const errorRsponse : Partial<BadServerException> = {      
                    message : "User not found",
                    errorCode : ErrorCode.USER_NOT_FOUND,
                    errorStatus : ErrorStatus.BAD_REQUEST,
                    details : {
                        isLoggedIn : false , 
                        success : false,                    
                    }                
                }     
                return done(errorRsponse, false )
            }   

            return done(null , userReturnedToFront)
        } catch (error) {
            console.log(error);
            const errorRsponse : Partial<BadServerException> = {      
                message : 'Internal server error!' ,
                errorCode : ErrorCode.SERVER_ERROR,
                errorStatus : ErrorStatus.SERVER_ERROR,
                details : {
                    isLoggedIn : false , 
                    success : false,                    
                }                
            }
            return done(errorRsponse  , null)
        }
    })
}
