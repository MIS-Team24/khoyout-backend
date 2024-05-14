import { prisma  } from "../../Database";
import { Prisma  } from "@prisma/client";
import { UserBody } from "../types/auth";
import { getUTCTime } from "../../Utilities/Time";

//find by unique attribute
export const findUserBy = async (data : Prisma.UsersWhereUniqueInput) => {
    const user = await prisma.users.findUnique({
        where : data
    })
    return user 
}

export async function getUserLoginData(email: string) {
    const result = await prisma.users.findUnique({
        where: {
            email: email
        },
        select: {
            email: true,
            password: true,
            id: true
        }
    });
    return result;
}

export async function getUserByToken(token: string, evenIfExpired = false)
{
    const result = await prisma.sessions.findFirst({where: {
        token: token
    }, select: {
        user: true,
        ExpiryDate: true
    }});

    if (!result) return null;

    if (evenIfExpired === false) {
        const UTCNow = getUTCTime();
        const ExpiryDate = result.ExpiryDate;

        if (UTCNow > ExpiryDate) {
            await deleteUserDbSession(token);
            return null;
        }
    }

    return result.user;
}

export async function initiateUserDbSession(token: string, userId: string, expiryDateUTC: Date): Promise<boolean>
{
    try
    {
        await prisma.sessions.create({
            data: {
                token: token,
                userId: userId,
                ExpiryDate: expiryDateUTC
            }
        });
        return true;
    }
    catch (error) {
        return false;
    }
}

export async function deleteUserDbSession(token: string) : Promise<boolean>
{
    try
    {
        await prisma.sessions.delete({
            where: {
                token: token
            }
        });
        return true;
    } catch (error) {
        return false;
    }
}

export async function deleteAllUserSessionsFromDb(userId: string) : Promise<boolean>
{
    try
    {
        await prisma.sessions.deleteMany({
            where: {
                userId: userId
            }
        });
        return true;
    } catch (error) {
        return false;
    }
}

export async function getUserById(userId: string) {
    const result = await prisma.users.findFirst({
        where: {
            id: userId
        }
    });

    return result;
}

//

//create user
export const addUser = async (data : Prisma.UsersCreateInput) => {
    const user = await prisma.users.create({data})
    return user as UserBody
}
//

//update user data
export const updateUser = async ( uniqueData : Prisma.UsersWhereUniqueInput , data? : Prisma.UsersUpdateInput) => {
    const user = await prisma.users.update({
        where : uniqueData,
        data : {...data}
    })
    return user 
}
//

//update user data
export const deleteUser = async (data : Prisma.UsersWhereUniqueInput) => {
    const user = await prisma.users.delete({
        where : data
    })
    return user 
}
//

//read all user data
export const readUser = async (data : Prisma.UsersWhereUniqueInput) => {
    const user  = await prisma.users.findUnique({
        where : data,
        include : {
            bodyMeasurements : true,
            stylePreferences : true,
            notificationPreferences : true
        }
    })
    return user 
}
//