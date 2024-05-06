const localStrategy = require('passport-local').Strategy
import { PassportStatic } from 'passport'
import {findUserByEmail, findUserById} from '../../API/Models/UserModel'
import bcrypt from 'bcrypt'
import { LoginBody, UserBody } from '../../API/types/auth/auth'

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
            return done(new Error("Incorrect password!") , null)    
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
                fullName: user?.fullName
            }
            //   

            if(!user) return done(new Error("User not found") , false )       
            return done(null , userReturnedToFront)

        } catch (error) {
            console.log(error);
            return done(new Error('Error on the sever please try again!') , null)
        }
    })
}
