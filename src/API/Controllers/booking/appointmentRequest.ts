import { Request, Response } from "express";
import "../../Models/AppointmentsModel";
import { addReviewForAppointment, createAppointmentRequest, getAppointmentByIdOfDesigner, getAppointmentByIdOfDesignerAndUser, getAvailableTimeById, reviewLeftType } from "../../Models/AppointmentsModel";
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
    serviceId: string,
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
        console.log("1");
        const user = req.user;
        if (!user) {
            return res.sendStatus(401);
        }
        console.log("2");

        const result = urlSchema.parse({designerId: req.params.designerId, requestDescription: req.body.requestDescription})
        const typedAssertedBody = req.body as AppointmentBookingBody;
        console.log("2");

        const AvailabilityTimeRequested = await getAvailableTimeById(typedAssertedBody.availableTimeId, result.designerId);
        const dayOfWeekSent = getDayOfWeek(typedAssertedBody.date);
        console.log("3");

        if (!AvailabilityTimeRequested) {
            return res.status(ResStatus.BAD_REQUEST).json(errorResponseTemplate(
                new BadRequestException(Messages.INVALID_DATA, ErrorCode.INVALID_DATA)
            ))
        }
        console.log("4");

        if (AvailabilityTimeRequested.dayOfWeek !== dayOfWeekSent) {
            return res.status(ResStatus.BAD_REQUEST).json(errorResponseTemplate(
                new BadRequestException(Messages.REQUEST_DAYOFWEEK_AND_DATE_NOT_MATCHING, ErrorCode.INVALID_DATA)
            ))
        }
        console.log("5");

        const convertedStartTime = convertFromTimezoneToUTC(typedAssertedBody.date, AvailabilityTimeRequested.startTime, AvailabilityTimeRequested.designer.timeZone);
        const convertedEndTime = convertFromTimezoneToUTC(typedAssertedBody.date, AvailabilityTimeRequested.endTime, AvailabilityTimeRequested.designer.timeZone);
        const startTimeUTC = updateDateKeepTime(convertedStartTime, typedAssertedBody.date);
        const endTimeUTC = updateDateKeepTime(convertedEndTime, typedAssertedBody.date);
        const UTCNow = getUTCTime();
        console.log("6");

        if (UTCNow >= startTimeUTC) {
            return res.status(ResStatus.BAD_REQUEST).json(errorResponseTemplate(
                new BadRequestException(Messages.REQUEST_DAYOFWEEK_AND_DATE_NOT_MATCHING, ErrorCode.INVALID_DATA)
            ))
        }
        console.log("7");
        console.log(req.body);
        const resultof = await createAppointmentRequest(user.id, result.designerId, startTimeUTC, endTimeUTC, typedAssertedBody.serviceId, result.requestDescription);
        console.log("8" + resultof);

        await deployNotification({from: "User", notification: "AppointmentRequest" }, result.designerId, {}, user.id);
        console.log("9");

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

export async function handleWritingReviewForAppointment(req: Request, res: Response)
{
    const user = req.user;
    if (!user) {
        return res.sendStatus(401);
    }

    const body = req.body as reviewLeftType;

    const designerId = req.params.designerId;
    const appointmentId = Number(req.params.appointmentId);
    const userId = user.id;

    const appointmentFound = await getAppointmentByIdOfDesignerAndUser(designerId, userId, appointmentId);

    if (appointmentFound === null) {
        return res.sendStatus(404);
    }

    if (appointmentFound.leftReview) {
        return res.sendStatus(403);
    }

    const  result = await addReviewForAppointment(appointmentId, designerId, userId, body.rate, body.comment);

    if (result) {
        res.status(200).send({message: "Successfully left a review."})
    }
    
}