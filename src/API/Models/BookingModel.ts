import { DayOfWeek } from "@prisma/client";
import { prisma } from "../../Database";
import { boolean } from "joi";

export async function deleteAvailableTime(designerId: string, availableTimeId: number)
{
    try
    {
        await prisma.availabilityTime.delete({
            where: {
                id: availableTimeId,
                designerId: designerId
            }
        })
        return true;
    } catch (error) {
        return false;
    }
}

export async function createAvailableTime(designerId: string, startTime: string, endTime: string, day: DayOfWeek) : Promise<number | boolean>
{
    try {
        const v = await prisma.availabilityTime.create({
            data: {
                dayOfWeek: day,
                endTime: endTime,
                startTime: startTime,
                designerId: designerId,
            }
        });
        return v.id;
    } catch (error) {
        return false;
    }
}