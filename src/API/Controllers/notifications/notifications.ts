import { Request, Response } from "express";
import { getAllUserNotifications, markNotificationsAsRead } from "../../Models/Notifications";
import { ResStatus } from "../../Exceptions/main";
import { Messages } from "../../../Services/responses/Messages";

export async function GetUserNotificationsController(req: Request, res: Response) {
    if (req.user === undefined) {
        return res.status(ResStatus.I_SERVER_ERROR).json({
            message: Messages.SERVER_ERROR,
        });
    }

    const userId = req.user.id?? "";
    const allNotifications = await getAllUserNotifications(userId);

    
    const mappedNotifications = allNotifications.map((notif) => {
        return {
            id: notif.id,
            read: notif.read,
            type: notif.type,
            time: notif.created_at,
            sender: notif.sender !== null? {
                id: notif.sender.id,
                name: notif.sender.firstName + " " + notif.sender.lastName,
            } : null,
            details: JSON.parse(notif.details as string)
        }
    })

    res.status(ResStatus.OK).json({
        data: mappedNotifications
    });
}

export async function MarkUsersNotificationsAsRead(req: Request, res: Response) {
    if (req.user === undefined) {
        return res.status(ResStatus.I_SERVER_ERROR).json({
            message: Messages.SERVER_ERROR,
        });
    }
    const assertedBody = req.body as {ids: number[]};

    const userId = req.user.id?? "";
    const successfulMarking = await markNotificationsAsRead(userId, assertedBody.ids);
    
    res.sendStatus(successfulMarking? ResStatus.OK : ResStatus.FORBIDDEN);
}