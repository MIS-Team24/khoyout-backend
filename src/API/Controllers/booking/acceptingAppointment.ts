import { Request, Response } from "express";
import "../../Models/AppointmentsModel";
import { acceptAppointmentRequest, createAppointmentRequest, getAppointmentByIdOfDesigner, getAvailableTimeById, setAppointmentMarkedAs } from "../../Models/AppointmentsModel";
import { ZodError, z } from "zod";
import { BadRequestException } from "../../Exceptions/badRequest";
import { errorResponseTemplate } from "../../../Services/responses/ErrorTemplate";
import { ErrorCode, ResStatus } from "../../Exceptions/main";
import { Messages } from "../../../Services/responses/Messages";
import { convertFromTimezoneToUTC, getUTCTime } from "../../../Utilities/Time";
import { deployNotification } from "../../Models/Notifications";
import { appointmentMarking, markType } from "../../../Services/validationSchemas/UserSchema";

type AppointmentBookingBody = {
    availableTimeId: number,
    requestDescription: string,
    date: string
}

const urlSchema = z.object({
    requestId: z.coerce.number().int().min(0)
})

export default async function handleAcceptingUserAppointmentRequest(req: Request, res: Response)
{
    try
    {
        const user = req.user;
        if (!user) {
            return res.sendStatus(401);
        }

        const result = urlSchema.parse({requestId: req.params.requestId})

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

export type markTypeType = z.infer<typeof appointmentMarking>;

export async function handleMarkinAppointmentAs(req: Request, res: Response)
{
    try
    {
        const user = req.user;
        if (!user) {
            return res.sendStatus(401);
        }

        const designerId = user.id;
        const appointmentId = Number(req.params.appointmentId);
        const typeCastedBody = req.body as markTypeType;

        const appointmentOfDesigner = await getAppointmentByIdOfDesigner(designerId, appointmentId);

        if (!appointmentOfDesigner) {
            return res.status(ResStatus.PAGE_NOT_FOUND).json(errorResponseTemplate(
                new BadRequestException(Messages.INVALID_DATA, ErrorCode.INVALID_DATA)
            ))
        }

        if (appointmentOfDesigner.status === "Missed" || appointmentOfDesigner.status === "Finished") {
            return res.status(ResStatus.FORBIDDEN).json(errorResponseTemplate(
                new BadRequestException("You cannot update a missed or a finished appointment.", ErrorCode.INVALID_DATA)
            ))
        }

        if (appointmentOfDesigner.status === "OnGoing" && typeCastedBody.markAs !== markType.Finished) {
            return res.status(ResStatus.FORBIDDEN).json(errorResponseTemplate(
                new BadRequestException("An ongoing appointment can only be marked as finished.", ErrorCode.INVALID_DATA)
            ))
        }

        const UTCNow = getUTCTime();

        if (!(UTCNow > appointmentOfDesigner.startDateTime)) {
            return res.status(ResStatus.FORBIDDEN).json(errorResponseTemplate(
                new BadRequestException("You must wait for the time to pass before you can mark this appointment as something.", ErrorCode.INVALID_DATA)
            ))
        }


        const acceptedSuccessfully = await setAppointmentMarkedAs(designerId, appointmentId, typeCastedBody.markAs);
        
        if (!acceptedSuccessfully) {
            return res.status(ResStatus.I_SERVER_ERROR).json(errorResponseTemplate(
                new BadRequestException(Messages.INVALID_DATA, ErrorCode.INVALID_DATA)
            ))
        }

        res.status(ResStatus.OK).json({
            message: "Successfully marked this appointment as " + typeCastedBody.markAs
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