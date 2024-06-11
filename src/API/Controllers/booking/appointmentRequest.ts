import { Request, Response } from "express";
import "../../Models/AppointmentsModel";
import { createAppointmentRequest, getAvailableTimeById } from "../../Models/AppointmentsModel";
import { ZodError, z } from "zod";
import { BadRequestException } from "../../Exceptions/badRequest";
import { errorResponseTemplate } from "../../../Services/responses/ErrorTemplate";
import { ErrorCode, ResStatus } from "../../Exceptions/main";
import { Messages } from "../../../Services/responses/Messages";
import { convertFromTimezoneToUTC, getDayOfWeek, getUTCTime, updateDateKeepTime } from "../../../Utilities/Time";
import { deployNotification } from "../../Models/Notifications";

type AppointmentBookingBody = {
    availableTimeId: number,
    requestDescription?: string,
    date: string
}

const urlSchema = z.object({
    designerId: z.string().uuid(),
    requestDescription: z.string().max(4096).optional(),
})

export default async function handleSendingAppointmentRequestToDesigner(req: Request, res: Response)
{
    try
    {
        const user = req.user;
        if (!user) {
            return res.sendStatus(401);
        }

        const result = urlSchema.parse({designerId: req.params.designerId, requestDescription: req.body.requestDescription})
        const typedAssertedBody = req.body as AppointmentBookingBody;

        const AvailabilityTimeRequested = await getAvailableTimeById(typedAssertedBody.availableTimeId, result.designerId);
        const dayOfWeekSent = getDayOfWeek(typedAssertedBody.date);

        if (!AvailabilityTimeRequested) {
            return res.status(ResStatus.BAD_REQUEST).json(errorResponseTemplate(
                new BadRequestException(Messages.INVALID_DATA, ErrorCode.INVALID_DATA)
            ))
        }
        
        if (AvailabilityTimeRequested.dayOfWeek !== dayOfWeekSent) {
            return res.status(ResStatus.BAD_REQUEST).json(errorResponseTemplate(
                new BadRequestException(Messages.REQUEST_DAYOFWEEK_AND_DATE_NOT_MATCHING, ErrorCode.INVALID_DATA)
            ))
        }

        const convertedStartTime = convertFromTimezoneToUTC(typedAssertedBody.date, AvailabilityTimeRequested.startTime, AvailabilityTimeRequested.designer.timeZone);
        const convertedEndTime = convertFromTimezoneToUTC(typedAssertedBody.date, AvailabilityTimeRequested.endTime, AvailabilityTimeRequested.designer.timeZone);
        const startTimeUTC = updateDateKeepTime(convertedStartTime, typedAssertedBody.date);
        const endTimeUTC = updateDateKeepTime(convertedEndTime, typedAssertedBody.date);
        const UTCNow = getUTCTime();

        if (UTCNow >= startTimeUTC) {
            return res.status(ResStatus.BAD_REQUEST).json(errorResponseTemplate(
                new BadRequestException(Messages.REQUEST_DAYOFWEEK_AND_DATE_NOT_MATCHING, ErrorCode.INVALID_DATA)
            ))
        }

        await createAppointmentRequest(user.id, result.designerId, startTimeUTC, endTimeUTC, result.requestDescription);
        await deployNotification({from: "User", notification: "AppointmentRequest" }, result.designerId, {}, user.id);

        res.status(ResStatus.OK).json({
            message: "Successfully Requested An Appointment"
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