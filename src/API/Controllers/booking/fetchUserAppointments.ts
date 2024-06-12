import { Request, Response } from "express";
import { getAccountAppointments } from "../../Models/AppointmentsModel";
import { ResStatus } from "../../Exceptions/main";

export async function handleFetchUserAppointments(req: Request, res: Response)
{
    const user = req.user;
    if (!user) {
        return res.sendStatus(401);
    }

    const appointmentsList = await getAccountAppointments(user.id, user.type);
    if (!appointmentsList) return res.status(ResStatus.I_SERVER_ERROR);
    
    const returnedForm = appointmentsList.map((appoint) => {
        return {
            id: appoint.id,
            designerId: appoint.designerId,
            designer: appoint.designer,
            userId: appoint.userId,
            user: appoint.user,
            leftReview: appoint.leftReview,
            startTime: appoint.startDateTime,
            endTime: appoint.endDateTime,
            description: appoint.request.requestDescription,
            status: appoint.status
        }
    });

    res.status(ResStatus.OK).json({data: returnedForm});
}