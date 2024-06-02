import { Request, Response } from 'express';
import { findDesignerBy } from "../../Models/DesignerModel";
import { ErrorCode, ResStatus } from '../../Exceptions/main';
import { BadRequestException } from '../../Exceptions/badRequest';
import { errorResponseTemplate } from '../../../Services/responses/ErrorTemplate';
import { Messages } from '../../../Services/responses/Messages';
import { BadServerException } from '../../Exceptions/badServer';

export const readDesignerProfileData = async (req: Request, res: Response) => {
    try {
        const designer = await findDesignerBy({ baseAccountId: req.params.id });
        
        if(!designer){         
            return res.status(ResStatus.I_SERVER_ERROR).json(errorResponseTemplate(
                new BadRequestException(Messages.DESIGNER_NOT_FOUND 
                    , ErrorCode.DESIGNER_NOT_FOUND)
            ))  
        }

        res.status(ResStatus.OK).json(designer);        
    } catch (error) {
        console.log(error)           
            return res.status(ResStatus.I_SERVER_ERROR).json(errorResponseTemplate(
                new BadServerException(Messages.SERVER_ERROR 
                    , ErrorCode.SERVER_ERROR , {error})
            ))  
    }
};