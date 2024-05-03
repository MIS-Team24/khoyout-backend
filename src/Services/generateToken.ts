import * as jwt from "jsonwebtoken"
import 'dotenv/config';

export const generateToken = (userDataStoredInCookie : object) => {
    return jwt.sign(
        userDataStoredInCookie , 
        process.env.ACCESS_TOKEN_SECRET_KEY || "secret key", 
        {
            expiresIn:"5m"
        }
    )
}