import {Request, Response} from "express"
import { supabase } from "../../../../Services/supabaseStorage"
import { ErrorCode, ResStatus } from "../../../Exceptions/main"
import { errorResponseTemplate } from "../../../../Services/responses/ErrorTemplate"
import { BadRequestException } from "../../../Exceptions/badRequest"
import { Messages } from "../../../../Services/responses/Messages"
import { BadServerException } from "../../../Exceptions/badServer"
import { findUserBy, updateUser } from "../../../Models/UserModel"
import { UserBody } from "../../../types/auth"

export const deleteAvatarController = async (req : Request , res : Response) =>{
    try {
        // const email = req.body.email  
        // if(!email){
        //     return res.status(ResStatus.BAD_REQUEST).json(errorResponseTemplate(
        //         new BadRequestException(Messages.INVALID_DATA 
        //             , ErrorCode.INVALID_DATA)
        //     ))   
        // }

        // //find that user to get their id
        // const user = await findUserBy({email})
        // //

        // if(!user){
        //     return res.status(ResStatus.BAD_REQUEST).json(errorResponseTemplate(
        //         new BadRequestException(Messages.USER_NOT_FOUND 
        //             , ErrorCode.USER_NOT_FOUND)
        //     ))   
        // }

        const user = req?.user as UserBody
        
        const { data } = await supabase.storage
        .from('khoyout')
        .remove([`/users/${user?.id}/user_profile_avatar`])

        const userUpdated = await updateUser( {id : user.id} , {avatarUrl : null})
        
        if(!userUpdated){         
            return res.status(ResStatus.I_SERVER_ERROR).json(errorResponseTemplate(
                new BadRequestException(Messages.USER_NOT_FOUND 
                    , ErrorCode.USER_NOT_FOUND)
            ))  
        }

        return res.status(ResStatus.OK).json({
            message : Messages.USER_UPDATED,
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
