import {Request, Response} from "express"
import { supabase } from "../../../../Services/supabaseStorage"
import { ErrorCode, ResStatus } from "../../../Exceptions/main"
import { errorResponseTemplate } from "../../../../Services/responses/ErrorTemplate"
import { BadRequestException } from "../../../Exceptions/badRequest"
import { Messages } from "../../../../Services/responses/Messages"
import { BadServerException } from "../../../Exceptions/badServer"
import { findDesignerBy, updateDesignerBy } from "../../../Models/DesignerModel"

export const deleteDesignerAvatar = async (req : Request , res : Response) =>{
    try {       
        const designer = await findDesignerBy({ baseAccountId: req.params.id });

        if(!designer){         
            return res.status(ResStatus.I_SERVER_ERROR).json(errorResponseTemplate(
                new BadRequestException(Messages.DESIGNER_NOT_FOUND 
                    , ErrorCode.DESIGNER_NOT_FOUND)
            ))  
        }

        const { data } = await supabase.storage
        .from('khoyout')
        .remove([`/designers/${designer?.baseAccountId}/designer_profile_avatar`])


        //update avatar url field in the database
        const designerUpdated = await updateDesignerBy({
            baseAccountId :  designer?.baseAccountId
        }, {
            avatarUrl : ""
        })
        //        

        if(!designerUpdated){         
            return res.status(ResStatus.I_SERVER_ERROR).json(errorResponseTemplate(
                new BadRequestException(Messages.DESIGNER_NOT_FOUND 
                    , ErrorCode.DESIGNER_NOT_FOUND)
            ))  
        }

        return res.status(ResStatus.OK).json({
            message : Messages.FILE_REMOVED,
            isAvatarRemoved : true
        }) 

        } catch (error) {
            console.log(error)  
            return res.status(ResStatus.I_SERVER_ERROR).json(errorResponseTemplate(
                new BadServerException(Messages.SERVER_ERROR 
                    , ErrorCode.SERVER_ERROR , {error})
            )) 
        }
}
