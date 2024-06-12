import { prisma } from "../../Database";
import { markType } from "../../Services/validationSchemas/UserSchema";
import { UserType } from "../types/user";

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

export async function rejectAppointmentRequest(designerId: string, bookingRequestId: number) : Promise<{success: boolean, data: {userId: string} | undefined}>
{
    try {
        const v = await prisma.bookingRequest.delete({
            where: {
                id: bookingRequestId,
                designerId: designerId
            }
        });
        return {
            data: {userId: v.userId},
            success: true
        };
    } catch (error) {
        return {success: false, data: undefined}
    }
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

export async function getAppointmentByIdOfDesigner(designerId: string, appointmentId: number) {
    return await prisma.appointment.findFirst({
        where: {
            designerId: designerId,
            id: appointmentId
        }
    })
}

export async function setAppointmentMarkedAs(designerId: string, appointmentId: number, status: markType) : Promise<boolean>
{
    try
    {
        const found = await prisma.appointment.findFirst({
            where: {
                designerId: designerId,
                id: appointmentId
            }
        })
        if (!found) return false;
        await prisma.appointment.updateMany({
            where: {
                designerId: designerId,
                id: appointmentId
            },
            data: {
                status: status
            }
        })
        return true;
    } catch (error) {
        return false
    }
}

export async function cancelAppointmentRequest(designerId: string, userId: string, bookingRequestId: number) : Promise<boolean>
{
    try {
        await prisma.bookingRequest.delete({where: {id: bookingRequestId, designerId: designerId, userId: userId, status: {
            notIn: ["Accepted", "Expired"]
        }}});

        return true;
    } catch (error) {
        return false;
    }
}

export async function getAccountAppointments(accountId: string, userType: UserType)
{
    try {
        const result = await prisma.appointment.findMany({
            where: {
                ... (userType === UserType.User? {userId: accountId} : {designerId: accountId})
            },
            select: {
                user: {
                    select: {
                        baseAccount: true,
                    }
                },
                userId: true,
                status: true,
                id: true,
                request: true,
                designer: {
                    select: {
                        baseAccount: true,
                    }
                },
                designerId: true,
                endDateTime: true,
                startDateTime: true,
            }
        });
        return result;
    } catch (error) {
        return undefined;
    }
}

export async function getAccountRequests(accountId: string, userType: UserType)
{
    try {
        const result = await prisma.bookingRequest.findMany({
            where: {
                ... (userType === UserType.User? {userId: accountId} : {designerId: accountId})
            },
            select: {
                user: {
                    select: {
                        baseAccount: true,
                        bodyMeasurements: true
                    }
                },
                userId: true,
                status: true,
                id: true,
                designer: {
                    select: {
                        baseAccount: true,
                    }
                },
                designerId: true,
                endDateTime: true,
                startDateTime: true,
                requestDescription: true,
                created_at: true,
                last_updated: true,
                Appointment: true
            }
        });
        return result;
    } catch (error) {
        return undefined;
    }
}