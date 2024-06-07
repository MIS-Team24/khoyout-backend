import { Request, Response } from "express";
import { ErrorCode , ResStatus } from "../../../Exceptions/main";
import { errorResponseTemplate } from "../../../../Services/responses/ErrorTemplate";
import { BadRequestException } from "../../../Exceptions/badRequest";
import { Messages } from "../../../../Services/responses/Messages";
import { findDesignerBy } from "../../../Models/DesignerModel";
import { updateServiceByID } from "../../../Models/ServiceModel";

export const updateDesignerService = async (req : Request , res : Response) => {
    const designer = await findDesignerBy({ baseAccountId: req.params.id });
        
    if(!designer){         
        return res.status(ResStatus.BAD_REQUEST).json(errorResponseTemplate(
            new BadRequestException(Messages.DESIGNER_NOT_FOUND 
                , ErrorCode.DESIGNER_NOT_FOUND)
        ))  
    }

    const fieldsToUpdate = {...req.body , designer}
    const serviceUpdated = await updateServiceByID(req.params.serviceId, fieldsToUpdate)   
    if(!serviceUpdated){         
        return res.status(ResStatus.BAD_REQUEST).json(errorResponseTemplate(
            new BadRequestException(Messages.SERVICE_NOT_FOUND 
                , ErrorCode.SERVICE_NOT_FOUND)
        ))  
    }

    return res.json({message : Messages.SERVICE_UPDATED , isServiceUpdated : true})
}