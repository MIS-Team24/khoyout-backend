import {Request, Response} from "express"
import { supabase } from "../../../../Services/supabaseStorage"
import { decodeFileToBase64 } from "../../../../Services/decodeFileToBase64"
import { ErrorCode, ResStatus } from "../../../Exceptions/main"
import { errorResponseTemplate } from "../../../../Services/responses/ErrorTemplate"
import { BadRequestException } from "../../../Exceptions/badRequest"
import { Messages } from "../../../../Services/responses/Messages"
import { BadServerException } from "../../../Exceptions/badServer"
import { findDesignerBy, updateDesignerBy } from "../../../Models/DesignerModel"

export const uploadUpdateDesignerAvatar= async (req : Request , res : Response) =>{
    try {
        const file = req.file;
        if(!file) {           
            return res.status(ResStatus.BAD_REQUEST).json(errorResponseTemplate(
                new BadRequestException(Messages.INVALID_FILE 
                    , ErrorCode.INVALID_FILE)
            ))        
        }

        const designer = await findDesignerBy({ baseAccountId: req.params.id });
        
        if(!designer){         
            return res.status(ResStatus.I_SERVER_ERROR).json(errorResponseTemplate(
                new BadRequestException(Messages.DESIGNER_NOT_FOUND 
                    , ErrorCode.DESIGNER_NOT_FOUND)
            ))  
        }
        
        // decode file buffer to base64
        const fileBase64 = decodeFileToBase64(file)
        //

        // upload the file to supabase
        const { data } = await supabase.storage
            .from("khoyout")
            .upload(`/designers/${designer?.baseAccountId}/designer_profile_avatar`, fileBase64 , {
                contentType: "image/png",
                cacheControl: '3600',
                upsert: true
            })
        //
    
        // get public url of the uploaded file
        const { data : image } = await supabase.storage
            .from('khoyout')
            .getPublicUrl(`/designers/${designer?.baseAccountId}/designer_profile_avatar`)
        //

        //update avatar url field in the database
        const designerUpdated = await updateDesignerBy({baseAccountId :  designer?.baseAccountId}, {avatarUrl : image?.publicUrl})
        //

        if(!designerUpdated){         
            return res.status(ResStatus.I_SERVER_ERROR).json(errorResponseTemplate(
                new BadRequestException(Messages.DESIGNER_NOT_FOUND 
                    , ErrorCode.DESIGNER_NOT_FOUND)
            ))  
        }

        return res.status(ResStatus.OK).json({
            message : Messages.FILE_UPLOADED,
            avatarUrl : image.publicUrl
        }) 

        } catch (error) {
            console.log(error)           
            return res.status(ResStatus.I_SERVER_ERROR).json(errorResponseTemplate(
                new BadServerException(Messages.SERVER_ERROR 
                    , ErrorCode.SERVER_ERROR , {error})
            ))  
        }
}
