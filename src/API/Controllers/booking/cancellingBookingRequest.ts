import { Request, Response } from "express";
import "../../Models/AppointmentsModel";
import { cancelAppointmentRequest, createAppointmentRequest, getAvailableTimeById } from "../../Models/AppointmentsModel";
import { ZodError, z } from "zod";
import { BadRequestException } from "../../Exceptions/badRequest";
import { errorResponseTemplate } from "../../../Services/responses/ErrorTemplate";
import { ErrorCode, ResStatus } from "../../Exceptions/main";
import { Messages } from "../../../Services/responses/Messages";
import { convertFromTimezoneToUTC } from "../../../Utilities/Time";
import { deployNotification } from "../../Models/Notifications";

type AppointmentBookingBody = {
    availableTimeId: number,
    requestDescription: string,
    date: string
}

const urlSchema = z.object({
    designerId: z.string().uuid(),
    requestId: z.coerce.number().int().min(0)
})

export default async function handleCancelBookingRequest(req: Request, res: Response)
{
    try
    {
        const user = req.user;
        if (!user) {
            return res.sendStatus(401);
        }

        const resultOfCancelling = await cancelAppointmentRequest(req.params.designerId, user.id, Number(req.params.requestId));
        
        if (resultOfCancelling === false) {
            return res.status(ResStatus.BAD_REQUEST).json(errorResponseTemplate(
                new BadRequestException(Messages.INVALID_DATA, ErrorCode.INVALID_DATA)
            ))
        }

        res.status(ResStatus.OK).json({
            message: "Successfully Cancelled Your Request"
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