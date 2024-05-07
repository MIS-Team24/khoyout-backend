import 'dotenv/config'; 
import * as nodemailer from "nodemailer"

export const transporter  = nodemailer.createTransport({
    service:"gmail",
    auth:{
        user:process.env.OWNER_USER_APP,
        pass:process.env.OWNER_PASSWORD_APP
    }
})

