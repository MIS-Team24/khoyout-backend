import { Request, Response } from "express";
import { getAccountRequests } from "../../Models/AppointmentsModel";
import { ResStatus } from "../../Exceptions/main";

export async function handleFetchRequests(req: Request, res: Response)
{
    const user = req.user;
    if (!user) {
        return res.sendStatus(401);
    }

    const requestsList = await getAccountRequests(user.id, user.type);
    if (!requestsList) return res.status(ResStatus.I_SERVER_ERROR);
    
    const returnedForm = requestsList.map((request) => {
        return {
            id: request.id,
            designerId: request.designerId,
            designer: request.designer,
            userId: request.userId,
            user: request.user,
            startTime: request.startDateTime,
            endTime: request.endDateTime,
            description: request.requestDescription,
            status: request.status,
            service: request.service
        }
    });

    res.status(ResStatus.OK).json({data: returnedForm});
}