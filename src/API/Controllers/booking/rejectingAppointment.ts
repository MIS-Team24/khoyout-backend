import { Request, Response } from "express";
import "../../Models/AppointmentsModel";
import { acceptAppointmentRequest, rejectAppointmentRequest } from "../../Models/AppointmentsModel";
import { ZodError, z } from "zod";
import { BadRequestException } from "../../Exceptions/badRequest";
import { errorResponseTemplate } from "../../../Services/responses/ErrorTemplate";
import { ErrorCode, ResStatus } from "../../Exceptions/main";
import { Messages } from "../../../Services/responses/Messages";
import { deployNotification } from "../../Models/Notifications";

type AppointmentBookingBody = {
    availableTimeId: number,
    requestDescription: string,
    date: string
}

const urlSchema = z.object({
    requestId: z.coerce.number().int().min(0)
})

export default async function handleRejectingAppointmentRequest(req: Request, res: Response)
{
    try
    {
        const user = req.user;
        if (!user) {
            return res.sendStatus(401);
        }

        const result = urlSchema.parse({requestId: req.params.requestId})

        const rejectedSuccessfully = await rejectAppointmentRequest(user.id, result.requestId);
        
        if (!rejectedSuccessfully) {
            return res.status(ResStatus.I_SERVER_ERROR).json(errorResponseTemplate(
                new BadRequestException(Messages.SERVER_ERROR, ErrorCode.SERVER_ERROR)
            ))
        }
        
        res.status(ResStatus.OK).json({
            message: "Successfully rejected This Requested."
        });
    } catch (error) {
        if (error instanceof ZodError) {
            const errorMessages = error.errors.map((issue: any) => ({
                message: `${issue.path.join('.')} is ${issue.message}`,
            }));

            return res.status(ResStatus.BAD_REQUEST).json(errorResponseTemplate(
                new BadRequestException(Messages.INVALID_DATA, ErrorCode.INVALID_DATA, {isDataValid : false , error : errorMessages})
            ))
        }
    }
    
}