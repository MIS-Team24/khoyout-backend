import { prisma } from "../../Database";
import {NotificationSenderType, NotificationType} from "prisma/prisma-client"

type NotificationBodySettings = {
    from: NotificationSenderType,
    notification: NotificationType
}

export async function deployNotification(settings: NotificationBodySettings, receiverUserID: string, meta: Object, senderUserId: string | undefined)
{
    try
    {
        if (settings.from === "System") {
            if (senderUserId !== undefined) {
                throw new Error("The sender id must always be undefined if the sender is a system.")
            }
        }

        const details = JSON.stringify(meta);

        await prisma.notification.create({
            data: {
                receiverId: receiverUserID,
                senderId: senderUserId,
                senderType: settings.from,
                type: settings.notification,
            }
        });
        return true;
    } catch (error) {
        console.log(error);
        return false;
    } 
}

export async function markNotificationsAsRead(receiverId: string, IDs: number[]) : Promise<boolean>
{
    try
    {
        await prisma.notification.updateMany({
            data: {
                read: true
            },
            where: {
                id: {in: IDs},
                receiverId: receiverId
            }
        });
        return true;
    } catch (error) {
        return false;
    }
}

export async function getAllUserNotifications(recieverId: string, limit: number = 10)
{
    const results = await prisma.notification.findMany({
        select: {
            id: true,
            created_at: true,
            details: true,
            read: true,
            type: true,
            sender: true,
            senderId: true,
            senderType: true
        },
        where: {
            receiverId: recieverId,
        },
        take: limit,
        orderBy: {
            created_at: "desc"
        }
    });
    return results;
}