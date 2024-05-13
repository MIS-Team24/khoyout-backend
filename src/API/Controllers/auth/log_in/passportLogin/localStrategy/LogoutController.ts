import { Request, Response } from "express";
import { Messages } from "../../../../../../Services/responses/Messages";
import { deleteUserDbSession } from "../../../../../Models/UserModel";
import { ResStatus } from "../../../../../Exceptions/main";

export const logoutHandler = async (req : Request , res : Response) => {
    const Token = req.headers.authorization?.split(" ")[1]?? "";
    const success = await deleteUserDbSession(Token);

    if (success)
    {
        return res.status(ResStatus.OK).json({
            message: Messages.USER_LOGGED_OUT
        });
    } else {
        return res.status(ResStatus.UNAUTHORIZED).json({
            message: Messages.USER_LOGGED_OUT
        });
    }
}