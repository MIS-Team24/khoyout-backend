import { Request, Response , NextFunction } from "express";
import { UserBody } from "../../../../../types/auth";
import { ErrorCode, ResStatus } from "../../../../../Exceptions/main";
import { Messages } from "../../../../../../Services/responses/Messages";
import { errorResponseTemplate } from "../../../../../../Services/responses/ErrorTemplate";
import { BadRequestException } from "../../../../../Exceptions/badRequest";
import bcrypt from 'bcrypt'
import { getUserById, getUserLoginData, initiateUserDbSession } from "../../../../../Models/UserModel";
import { addHoursToDate, getUTCTime } from "../../../../../../Utilities/Time";
import { BadServerException } from "../../../../../Exceptions/badServer";
import generateUserJSONToken from "../../../../../../Utilities/generateToken";

export async function localLoginHandler (req: Request , res :Response , next :NextFunction)
{
    const loginBody = req.body as {email: string, password: string};
    const user = await getUserLoginData(loginBody.email);

    if(!user){         
        return res.status(ResStatus.PAGE_NOT_FOUND).json(errorResponseTemplate(
            new BadRequestException(Messages.USER_NOT_FOUND, ErrorCode.USER_NOT_FOUND)                   
        ))
    } 

    const isMatch = await bcrypt.compare(loginBody.password, user.password)

    if (!isMatch) {
        return res.status(ResStatus.UNAUTHORIZED).json(errorResponseTemplate(
            new BadRequestException(Messages.INCORRECT_PASSWORD, ErrorCode.INCORRECT_PASSWORD)                   
        ))
    }

    const fullUser = await getUserById(user.id);

    if (!fullUser) {
        return res.status(ResStatus.I_SERVER_ERROR).json(errorResponseTemplate(
            new BadServerException(Messages.SERVER_ERROR, ErrorCode.SERVER_ERROR)
        ))
    }

    const token = generateUserJSONToken(user.email);
    await initiateUserDbSession(token, user.id, addHoursToDate(getUTCTime(), 1)); // expires in an hour.

    //the user form returned according to the frontent desire
    let userReturnedToFront : UserBody = {
        email: fullUser.email,
        emailActivated:fullUser.emailActivated,
        createdAt : fullUser.createdAt,
        fullName: fullUser.fullName,
        phone : fullUser.phone
    }

    return res.json({
                message: Messages.USER_LOGGED_IN,
                user : userReturnedToFront,
                access_token: token
            })
}