import {Request, Response} from "express"
import { supabase } from "../../../../Services/supabaseStorage"
import { decodeFileToBase64 } from "../../../../Services/decodeFileToBase64"
import { ErrorCode, ResStatus } from "../../../Exceptions/main"
import { errorResponseTemplate } from "../../../../Services/responses/ErrorTemplate"
import { BadRequestException } from "../../../Exceptions/badRequest"
import { Messages } from "../../../../Services/responses/Messages"
import { BadServerException } from "../../../Exceptions/badServer"
import { findDesignerBy } from "../../../Models/DesignerModel"
import { addPortofolioFile, updatePortofolioFileByID } from "../../../Models/PortofolioModel"
import { Prisma } from "@prisma/client"

export const uploadUpdateDesignerProtofolioFile= async (req : Request , res : Response) =>{
    try {
        const designer = await findDesignerBy({ baseAccountId: req.params.id });       
        if(!designer){         
            return res.status(ResStatus.I_SERVER_ERROR).json(errorResponseTemplate(
                new BadRequestException(Messages.DESIGNER_NOT_FOUND 
                    , ErrorCode.DESIGNER_NOT_FOUND)
            ))  
        }

        const file = req.file;
        if(!file) {           
            return res.status(ResStatus.BAD_REQUEST).json(errorResponseTemplate(
                new BadRequestException(Messages.INVALID_FILE 
                    , ErrorCode.INVALID_FILE)
            ))        
        }
        
        // decode file buffer to base64
        const fileBase64 = decodeFileToBase64(file)
        //
        
        let portofolioFileCreated

        const targetFile = designer.portfolios.find((portfolioFile) => portfolioFile.id == req.params.fileId)
        if(!targetFile){
            const newPortofolioFile = {
                url : "",
                designer : designer
            } as Prisma.PortfolioCreateInput
            portofolioFileCreated = await addPortofolioFile(newPortofolioFile)
        }else{
            portofolioFileCreated = targetFile
        }
    
        // upload or update the file to supabase
        await supabase.storage
            .from("khoyout")
            .upload(`/designers/${designer?.baseAccountId}/portofolio/${portofolioFileCreated?.id}`
            , fileBase64 , {
                contentType: "image/png",
                cacheControl: '3600',
                upsert: true
            })
        //
    
        // get public url of the uploaded file
        const { data : image } = await supabase.storage
            .from('khoyout')
            .getPublicUrl(`/designers/${designer?.baseAccountId}/portofolio/${portofolioFileCreated?.id}`)
        //

        //update url
        const portofolioDataUpdated = {
            url : image?.publicUrl ,
            designer
        } as Prisma.PortfolioUpdateInput
        await updatePortofolioFileByID(portofolioFileCreated.id , portofolioDataUpdated)
        //

        return res.status(ResStatus.OK).json({
            message : Messages.FILE_UPLOADED,
            fileId : portofolioFileCreated?.id,
            fileUrl : image.publicUrl
        }) 

        } catch (error) {
            console.log(error)           
            return res.status(ResStatus.I_SERVER_ERROR).json(errorResponseTemplate(
                new BadServerException(Messages.SERVER_ERROR 
                    , ErrorCode.SERVER_ERROR , {error})
            ))  
        }
}
