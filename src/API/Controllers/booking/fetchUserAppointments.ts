import { Request, Response } from "express";
import { getUserAppointments } from "../../Models/AppointmentsModel";
import { ResStatus } from "../../Exceptions/main";

export async function handleFetchUserAppointments(req: Request, res: Response)
{
    const user = req.user;
    if (!user) {
        return res.sendStatus(401);
    }

    const appointmentsList = await getUserAppointments(user.id);
    if (!appointmentsList) return res.status(ResStatus.I_SERVER_ERROR);
    
    const returnedForm = appointmentsList.map((appoint) => {
        return {
            id: appoint.id,
            designerId: appoint.designerId,
            startTime: appoint.startDateTime,
            endTime: appoint.endDateTime,
            status: appoint.status
        }
    });

    res.status(ResStatus.OK).json({data: returnedForm});
}