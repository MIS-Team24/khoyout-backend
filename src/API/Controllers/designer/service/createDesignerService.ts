import { Request, Response } from "express";
import { ErrorCode , ResStatus } from "../../../Exceptions/main";
import { errorResponseTemplate } from "../../../../Services/responses/ErrorTemplate";
import { BadRequestException } from "../../../Exceptions/badRequest";
import { Messages } from "../../../../Services/responses/Messages";
import { findDesignerBy } from "../../../Models/DesignerModel";
import { addService } from "../../../Models/serviceModel";
import { BadServerException } from "../../../Exceptions/badServer";
import { z } from "zod";

export const createServiceSchema = z.object({
    title: z.string().min(2),
    description: z.string().min(40).max(4090),
    price: z.number().int().min(0).max(10000)
});

export type createServiceType = z.infer<typeof createServiceSchema>

export const createDesignerService = async (req : Request , res : Response) => {
    const user = req.user;
    if (!user) {
        return res.sendStatus(401);
    }

    const requestBody = req.body as createServiceType;

    const newServiceCreated = await addService(user.id, requestBody);

    if(!newServiceCreated){
        return res.status(ResStatus.I_SERVER_ERROR).json(errorResponseTemplate(
            new BadServerException(Messages.SERVER_ERROR 
                , ErrorCode.SERVER_ERROR)
        ))  
    }

    return res.json({message : Messages.SERVICE_CREATED , service : newServiceCreated})
}
