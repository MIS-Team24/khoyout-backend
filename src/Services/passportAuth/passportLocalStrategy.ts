const localStrategy = require('passport-local').Strategy
import { PassportStatic } from 'passport'
import {findUserByEmail, findUserById} from '../../API/Models/UserModel'
import bcrypt from 'bcrypt'

export const initializePassport = (passport : PassportStatic)=>{
    passport.use(new localStrategy({
    usernameField:'email'
    } , async (email : string , password : string , done : CallableFunction)=>{

    console.log(email , password);
        
    if(email && password){
        const user = await findUserByEmail(email)
        
        if(!user){
            return done(null , false) //there is no user with this email
        } 
        
        const isMatch = await bcrypt.compare(password , user.password)

        if(isMatch) {
            return done(null , user)
        }

        return done(new Error("incorrect password!") , null)
    }else{      
        return done(new Error('No input!'), null)
    } 
    }))

    passport.serializeUser((user : any, done) =>{
        return done(null , user.id)
    })
    
    passport.deserializeUser(async (id : string, done) => {
        try {
            const user =await findUserById(id)
            if(!user) return done(new Error("user not found") , false )       
            return done(null , user)

        } catch (error) {
            console.log(error);
            return done(new Error('Error on the sever please try again!') , null)
        }
    })
}
