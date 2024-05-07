const localStrategy = require('passport-local').Strategy
import { PassportStatic } from 'passport'
import {findUserByEmail, findUserById} from '../../API/Models/UserModel'
import bcrypt from 'bcrypt'
import { LoginBody, UserBody } from '../../API/types/auth/auth'
import { BadRequestException } from '../../API/Exceptions/badRequest'
import { ErrorCode } from '../../API/Exceptions/main'
import { BadServerException } from '../../API/Exceptions/badServer'
import { Messages } from '../responses/Messages'
import { ErrorResponseType, errorResponseTemplate } from '../responses/ErrorTemplate'

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

            let errorRsponse : ErrorResponseType 
            errorRsponse = errorResponseTemplate(
            new BadRequestException(Messages.INCORRECT_PASSWORD
            ,ErrorCode.INCORRECT_PASSWORD, {isLoggedIn : false})) 

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
                let errorRsponse : ErrorResponseType 
                    errorRsponse = errorResponseTemplate(
                    new BadRequestException(Messages.USER_NOT_FOUND
                    ,ErrorCode.USER_NOT_FOUND, {isLoggedIn : false})) 

                return done(errorRsponse, false )
            }   

            return done(null , userReturnedToFront)
            
        } catch (error) {
            console.log(error)
            let errorRsponse : ErrorResponseType 
            errorRsponse = errorResponseTemplate(
                new BadServerException(Messages.SERVER_ERROR
                ,ErrorCode.SERVER_ERROR, {isLoggedIn : false})) 

            return done(errorRsponse, null)
        }
    })
}
