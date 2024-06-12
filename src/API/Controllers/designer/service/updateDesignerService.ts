import { Request, Response } from "express";
import { ErrorCode , ResStatus } from "../../../Exceptions/main";
import { errorResponseTemplate } from "../../../../Services/responses/ErrorTemplate";
import { BadRequestException } from "../../../Exceptions/badRequest";
import { Messages } from "../../../../Services/responses/Messages";
import { findDesignerBy } from "../../../Models/DesignerModel";
import { updateServiceByID } from "../../../Models/serviceModel";
import { createServiceType } from "./createDesignerService";

export const updateDesignerService = async (req : Request , res : Response) => {
    const user = req.user;
    if (!user) {
        return res.sendStatus(401);
    }

    const requestBody = req.body as createServiceType;

    const serviceUpdated = await updateServiceByID(user.id, req.params.serviceId, requestBody);

    if(!serviceUpdated){         
        return res.status(ResStatus.BAD_REQUEST).json(errorResponseTemplate(
            new BadRequestException(Messages.SERVICE_NOT_FOUND 
                , ErrorCode.SERVICE_NOT_FOUND)
        ))  
    }

    return res.json({message : Messages.SERVICE_UPDATED , isServiceUpdated : true})
}