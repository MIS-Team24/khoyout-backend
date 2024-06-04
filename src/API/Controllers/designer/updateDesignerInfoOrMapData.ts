import { Request, Response } from "express";
import { ErrorCode , ResStatus } from "../../Exceptions/main";
import { errorResponseTemplate } from "../../../Services/responses/ErrorTemplate";
import { BadRequestException } from "../../Exceptions/badRequest";
import { Messages } from "../../../Services/responses/Messages";
import { findDesignerBy, updateDesignerBy } from "../../Models/DesignerModel";

export const updateDesignerData = async (req : Request , res : Response) => {
    const designer = await findDesignerBy({ baseAccountId: req.params.id });
        
    if(!designer){         
        return res.status(ResStatus.I_SERVER_ERROR).json(errorResponseTemplate(
            new BadRequestException(Messages.DESIGNER_NOT_FOUND 
                , ErrorCode.DESIGNER_NOT_FOUND)
        ))  
    }

    const designerUpdated = await updateDesignerBy({baseAccountId :  designer?.baseAccountId},req.body)
    
    if(!designerUpdated){         
        return res.status(ResStatus.I_SERVER_ERROR).json(errorResponseTemplate(
            new BadRequestException(Messages.DESIGNER_NOT_FOUND 
                , ErrorCode.DESIGNER_NOT_FOUND)
        ))  
    }

    return res.status(ResStatus.OK).json({
        message : Messages.DESIGNER_UPDATED,
        isDesignerDataUpdated : true
    })
}