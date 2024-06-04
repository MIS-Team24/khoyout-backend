import {Request, Response} from "express"
import { supabase } from "../../../../Services/supabaseStorage"
import { ErrorCode, ResStatus } from "../../../Exceptions/main"
import { errorResponseTemplate } from "../../../../Services/responses/ErrorTemplate"
import { BadRequestException } from "../../../Exceptions/badRequest"
import { Messages } from "../../../../Services/responses/Messages"
import { BadServerException } from "../../../Exceptions/badServer"
import { findDesignerBy} from "../../../Models/DesignerModel"
import { deletePortofolioFileByID } from "../../../Models/PortofolioModel"

export const deleteDesignerPortofolioFile = async (req : Request , res : Response) =>{
    try {       
        const designer = await findDesignerBy({ baseAccountId: req.params.id});
        if(!designer){         
            return res.status(ResStatus.I_SERVER_ERROR).json(errorResponseTemplate(
                new BadRequestException(Messages.DESIGNER_NOT_FOUND 
                    , ErrorCode.DESIGNER_NOT_FOUND)
            ))  
        }

        await supabase.storage
        .from('khoyout')
        .remove([`/designers/${designer?.baseAccountId}/portofolio/${req.params.fileId}`])

        await deletePortofolioFileByID(req.params.fileId)

        return res.status(ResStatus.OK).json({
            message : Messages.FILE_REMOVED,
            isFileRemoved : true
        }) 

        } catch (error) {
            console.log(error)  
            return res.status(ResStatus.I_SERVER_ERROR).json(errorResponseTemplate(
                new BadServerException(Messages.SERVER_ERROR 
                    , ErrorCode.SERVER_ERROR , {error})
            )) 
        }
}
