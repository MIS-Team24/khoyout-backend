import { Request, Response } from "express";
import { UserBody } from "../../types/auth";
import { deleteAllUserSessionsFromDb, deleteBaseAccountWithId, deleteUser, insertAccountDeleteReason } from "../../Models/UserModel";
import { ErrorCode, ResStatus } from "../../Exceptions/main";
import { errorResponseTemplate } from "../../../Services/responses/ErrorTemplate";
import { BadRequestException } from "../../Exceptions/badRequest";
import { Messages } from "../../../Services/responses/Messages";
import { supabase } from "../../../Services/supabaseStorage";
import { UserDeleteAccountReason } from "@prisma/client";

type deleteAccountBody = {
    reason: UserDeleteAccountReason,
    otherReason?: string
}

export const deleteUserAccount = async (req : Request , res : Response) => {
    const user = req?.user as UserBody
    const reqBody = req.body as deleteAccountBody;

    const userId = user?.id?? "";
    const userDeleted = await deleteBaseAccountWithId(user?.id);
    if(!userDeleted){
        return res.status(ResStatus.BAD_REQUEST).json(errorResponseTemplate(new BadRequestException(Messages.USER_NOT_FOUND, ErrorCode.USER_NOT_FOUND)));
    }

    const { data } = await supabase.storage
        .from('khoyout')
        .remove([`/users/${user?.id}`])

    await insertAccountDeleteReason(reqBody.reason, reqBody.otherReason);


    return res.status(ResStatus.OK).json({
        message: Messages.USER_DELETED,
        isUserAccountDeleted : true,
    });
}