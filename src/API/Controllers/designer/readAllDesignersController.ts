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
import { designerGender, designersQuerySchema, designersSortBy } from '../../Routes/designer/designerRoutes';

type designerType = {
    name?: string;
    openNow?: boolean;
    location?: string;
    minRating?: number
    gender?: designerGender;
    yearsOfExperience?: number;
    page?: number;
    limit?: number;
    sortby?: designersSortBy;
};

export const getAllDesigners = async (req: Request, res: Response) => {
    try {
        const assertedQuery = designersQuerySchema.safeParse(req.query);// not the typical way you'd wanna do this, but its safe eitehrway t hanks to the middleware.
        const fixedTypeQuery = assertedQuery.data as designerType;
        const designers = await readAllDesigners(fixedTypeQuery);
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
};