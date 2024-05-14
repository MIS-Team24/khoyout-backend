import * as jwt from "jsonwebtoken"
import 'dotenv/config';

export default function generateUserJSONToken (userEmail: string )
{
    return jwt.sign(
        userEmail, 
        process.env.ACCESS_TOKEN_SECRET_KEY || "secret key", 
    )
}