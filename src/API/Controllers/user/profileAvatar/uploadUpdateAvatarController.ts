import {Request, Response} from "express"
import { supabase } from "../../../../Services/supabaseStorage"
import { decodeFileToBase64 } from "../../../../Services/decodeFileToBase64"
import { ErrorCode, ResStatus } from "../../../Exceptions/main"
import { errorResponseTemplate } from "../../../../Services/responses/ErrorTemplate"
import { BadRequestException } from "../../../Exceptions/badRequest"
import { Messages } from "../../../../Services/responses/Messages"
import { BadServerException } from "../../../Exceptions/badServer"
import { updateUser } from "../../../Models/UserModel"
import { UserBody } from "../../../types/auth"

export const uploadUpdateAvatarController = async (req : Request , res : Response) =>{
    try {
        const file = req.file;
        if(!file) {           
            return res.status(ResStatus.BAD_REQUEST).json(errorResponseTemplate(
                new BadRequestException(Messages.INVALID_FILE 
                    , ErrorCode.INVALID_FILE)
            ))        
        }

        const user = req?.user as UserBody

        // decode file buffer to base64
        const fileBase64 = decodeFileToBase64(file)
        // upload the file to supabase
        const { data } = await supabase.storage
            .from("khoyout")
            .upload(`/users/${user?.id}/user_profile_avatar`, fileBase64 , {
                contentType: "image/png",
                cacheControl: '3600',
                upsert: true
            })
        //
        // get public url of the uploaded file
        const { data : image } = await supabase.storage
            .from('khoyout')
            .getPublicUrl(`users/${user?.id}/user_profile_avatar`)
        //
        //update avatar url field in the database
        const userUpdated = await updateUser( {id : user.id} , {avatarUrl : image?.publicUrl})
        //

        if(!userUpdated){         
            return res.status(ResStatus.I_SERVER_ERROR).json(errorResponseTemplate(
                new BadRequestException(Messages.USER_NOT_FOUND 
                    , ErrorCode.USER_NOT_FOUND)
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
