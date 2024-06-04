import { Request, Response } from "express";
import { ErrorCode , ResStatus } from "../../../Exceptions/main";
import { errorResponseTemplate } from "../../../../Services/responses/ErrorTemplate";
import { BadRequestException } from "../../../Exceptions/badRequest";
import { Messages } from "../../../../Services/responses/Messages";
import { findDesignerBy } from "../../../Models/DesignerModel";
import { addService } from "../../../Models/ServiceModel";
import { BadServerException } from "../../../Exceptions/badServer";

export const createDesignerService = async (req : Request , res : Response) => {
    const designer = await findDesignerBy({ baseAccountId: req.params.id });
        
    if(!designer){         
        return res.status(ResStatus.BAD_REQUEST).json(errorResponseTemplate(
            new BadRequestException(Messages.DESIGNER_NOT_FOUND 
                , ErrorCode.DESIGNER_NOT_FOUND)
        ))  
    }

    const newService = {...req.body , designer}

    const newServiceCreated = await addService(newService)
    if(!newServiceCreated){
        return res.status(ResStatus.I_SERVER_ERROR).json(errorResponseTemplate(
            new BadServerException(Messages.SERVER_ERROR 
                , ErrorCode.SERVER_ERROR)
        ))  
    }

    return res.json({message : Messages.SERVICE_CREATED , service : newServiceCreated})
}
