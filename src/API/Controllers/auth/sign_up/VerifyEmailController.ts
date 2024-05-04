import { Response , Request} from "express";
import { OtpBody } from "../../../types/auth/auth";
import { verifyEmail } from "../../../Models/UserModel";

export async function verifyEmailHandler (req: Request, res: Response)
{
    const otpBody = req.body as OtpBody
    const user = await verifyEmail(otpBody.email)
    if(!user) res.json({error : "This user is not exist!"})
    res.json({message : "Your email has been activated successfully!" , success : true})
}