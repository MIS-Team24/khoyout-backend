// import { Request, Response } from "express";
// import { UserBody } from "../../types/auth";
// import { updateUser } from "../../Models/UserModel";
// import { ErrorCode , ResStatus } from "../../Exceptions/main";
// import { errorResponseTemplate } from "../../../Services/responses/ErrorTemplate";
// import { BadRequestException } from "../../Exceptions/badRequest";
// import { Messages } from "../../../Services/responses/Messages";
// import { ChangePasswordBody } from "../../types/user";
// import * as bcrypt from "bcrypt"

// export const changeUserPassword = async (req : Request , res : Response) => {
//     const user = req?.user as UserBody
    
// }

import { Request, Response } from 'express';
import { readAllDesigners, findDesignerBy } from "../../Models/DesignerModel";

export const getAllDesigners = async (req: Request, res: Response) => {
    try {
        const designers = await readAllDesigners(req.query);
        res.json(designers);
    } catch (error) {
        res.status(500).json({ error: error as any });
    }
};

export const getDesignerById = async (req: Request, res: Response) => {
    try {
        const designer = await findDesignerBy({ baseAccountId: req.params.id });
        if (designer) {
            res.json(designer);
        } else {
            res.status(404).json({ error: 'Designer not found' });
        }
    } catch (error) {
        res.status(500).json({ error: error as any });
    }
}
