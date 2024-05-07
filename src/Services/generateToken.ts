import * as jwt from "jsonwebtoken"
import 'dotenv/config';

export const generateToken = (userDataStoredInCookie : object , expiresIn : string) => {
    return jwt.sign(
        userDataStoredInCookie , 
        process.env.ACCESS_TOKEN_SECRET_KEY || "secret key", 
        {
            expiresIn
        }
    )
}