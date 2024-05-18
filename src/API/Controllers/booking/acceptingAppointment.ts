import { Request, Response } from "express";
import "../../Models/AppointmentsModel";
import { acceptAppointmentRequest, createAppointmentRequest, getAvailableTimeById } from "../../Models/AppointmentsModel";
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
    requestId: z.coerce.number().min(0)
})

export default async function handleAcceptingUserAppointmentRequest(req: Request, res: Response)
{
    try
    {
        const user = req.user;
        if (!user) {
            return res.sendStatus(401);
        }

        const result = urlSchema.parse({requestId: req.query.requestId})

        const acceptedSuccessfully = await acceptAppointmentRequest(user.id, result.requestId);
        
        if (!acceptedSuccessfully.success) {
            return res.status(ResStatus.BAD_REQUEST).json(errorResponseTemplate(
                new BadRequestException(Messages.INVALID_DATA, ErrorCode.INVALID_DATA)
            ))
        }
        
        await deployNotification({from: "User", notification: "BookingConfirmed"}, acceptedSuccessfully.data?.userId?? "", {}, user.id);

        res.status(ResStatus.OK).json({
            message: "Successfully confirmed This Appointment."
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