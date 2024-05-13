import { NextFunction , Request , Response } from "express"
import { ErrorCode, ResStatus } from "../Exceptions/main"
import { errorResponseTemplate } from "../../Services/responses/ErrorTemplate"
import { Messages } from "../../Services/responses/Messages"
import { BadAuthonticationException } from "../Exceptions/badAuthontication"
import { BadRequestException } from "../Exceptions/badRequest"
import { getUserByToken } from "../Models/UserModel"

type userType = {
    id: string;
    fullName: string;
    firstName: string;
    lastName: string;
    email: string;
    emailActivated: boolean;
    password: string;
    phone: string | null;
}

export type AuthedRequest<T extends {}> = T & {
    authedUser: userType | null
};

export async function checkIfAuthenticated (req : Request, res : Response , next : NextFunction) {
    let isAuthed: boolean = false;
    let authHeader = req.headers.authorization;
    
    if (authHeader) {
        if (authHeader.startsWith("Bearer ")) {
            const Token = authHeader.substring(7, authHeader.length);
            const user = await getUserByToken(Token);
            
            if (user) {
                console.log(user);

                req.user = user;
                isAuthed = true;
            }
        }
    }

    if(!isAuthed)
        return res.status(ResStatus.UNAUTHORIZED).json(errorResponseTemplate(new BadAuthonticationException(Messages.USER_NOT_AUTHONTICATED, ErrorCode.USER_NOT_AUTHONTICATED)));

    next();
}

export async function checkIfNotAuthenticated (req : Request, res : Response , next : NextFunction) {
    let isAuthed: boolean = false;
    let authHeader = req.headers.authorization;

    if (authHeader) {
        if (authHeader.startsWith("Bearer ")) {
            const Token = authHeader.substring(7, authHeader.length);
            const user = await getUserByToken(Token);
            if (user) {
                req.user = user;
                isAuthed = true;
            }
        }
    }

    if(isAuthed)
        return res.status(ResStatus.UNAUTHORIZED).json(errorResponseTemplate(new BadAuthonticationException(Messages.USER_ALREADY_AUTHONTICATED, ErrorCode.USER_ALREADY_AUTHONTICATED)));

    next();
}