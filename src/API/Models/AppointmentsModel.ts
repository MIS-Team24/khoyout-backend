import { prisma } from "../../Database";

export async function createAppointmentRequest(userId: string, designerId: string, startTime: Date, endTime: Date, description: string = "") : Promise<boolean>
{
    try {
        // create entry in the database
        const result = await prisma.bookingRequest.create({
            data: {
                userId: userId,
                designerId: designerId,
                status: "Waiting",
                requestDescription: description,
                startDateTime: startTime,
                endDateTime: endTime
            }
        });
        console.log(result);
        return true;
    }
    catch (error) {
        return false;        
    }
}

export async function getAvailableTimeById(AvailableTimeId: number, designerId: string)
{
    const result = await prisma.availabilityTime.findFirst({
        where: {
            id: AvailableTimeId,
            designerId: designerId
        },
        select: {
            startTime: true,
            endTime: true,
            dayOfWeek: true,
            designer: {
                select: {
                    timeZone: true
                }
            }
        }
    });

    return result;
}

export async function getDesignerAllAvailableTimes (designerId: string)
{
    const result = await prisma.availabilityTime.findMany({
        where: {
            designerId: designerId
        },
        select: {
            id: true,
            startTime: true,
            endTime: true,
            dayOfWeek: true,
        }
    });

    return result;
}

export async function getDesignerTimezone(designerId: string)
{
    const result = await prisma.designerProfile.findFirst({
        where: {
            baseAccountId: designerId
        },
        select: {
            timeZone: true
        }
    });

    return result?.timeZone;
}

export async function acceptAppointmentRequest(designerId: string, bookingRequestId: number) : Promise<{success: boolean, data: {userId: string} | undefined}>
{
    try
    {
        const AppointmentRequest = await prisma.bookingRequest.findFirst({where: {id: bookingRequestId}});

        if (!AppointmentRequest) return {success: false, data: undefined};

        await prisma.bookingRequest.update({
            data: {
                status: "Accepted",
                Appointment: {
                    create: {
                        startDateTime: AppointmentRequest.startDateTime,
                        endDateTime: AppointmentRequest.endDateTime,
                        status: "Booked",
                        userId: AppointmentRequest.userId,
                        designerId: designerId
                    }
                }
            },
            where: {
                id: bookingRequestId
            }
        });
        return {success: true, data: {userId: AppointmentRequest.userId}};
    }
    catch (error) {
        return {success: false, data: undefined};
    }
}

export async function cancelAppointmentRequest(designerId: string, userId: string, bookingRequestId: number) : Promise<boolean>
{
    try {
        const AppointmentRequest = await prisma.bookingRequest.findFirst({where: {id: bookingRequestId}});
        if (!AppointmentRequest) return false;

        await prisma.bookingRequest.delete({where: {id: bookingRequestId, designerId: designerId, userId: userId}});

        return true;
    } catch (error) {
        return false;
    }
}

export async function getUserAppointments(userId: string)
{
    try {
        const result = await prisma.appointment.findMany({
            where: {
                userId: userId
            }
        });
        return result;
    } catch (error) {
        return undefined;
    }
}