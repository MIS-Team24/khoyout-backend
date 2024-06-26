import { prisma  } from "../../Database";
import { Prisma, UserDeleteAccountReason  } from "@prisma/client";
import { UserBody } from "../types/auth";
import { getUTCTime } from "../../Utilities/Time";
import { UserType } from "../types/user";

//find by unique attribute
export const findUserBy = async (data : Prisma.UsersWhereUniqueInput) => {
    const user = await prisma.users.findUnique({
        where : data
    })
    return user 
}

export async function getUserByEmail(email: string)
{
    const user = await prisma.baseAccount.findFirst({
        where: {
            email: email
        }
    })
    return user;
}

export async function getUserLoginData(email: string) {
    const result = await prisma.baseAccount.findUnique({
        where: {
            email: email,
            emailActivated: true
        },
        select: {
            email: true,
            password: true,
            id: true
        }
    });
    return result;
}

export async function getUserByToken(token: string, evenIfExpired = false) : Promise<UserBody | null>
{
    const result = await prisma.sessions.findFirst({where: {
        token: token
    }, select: {
        baseAccount: {
            select: {
                id: true,
                email: true,
                emailActivated: true,
                firstName: true,
                lastName: true,
                createdAt: true,
                phone: true,
                designer: true,
                user: true,               
            }
        },
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

    const baseAccount = result.baseAccount;

    return {
        id: baseAccount.id,
        email: baseAccount.email,
        emailActivated: baseAccount.emailActivated,
        firstName: baseAccount.firstName,
        lastName: baseAccount.lastName,
        createdAt: new Date(baseAccount.createdAt),
        phone: baseAccount.phone,
        type: baseAccount.user !== null? UserType.User : UserType.Designer
    };
}

export async function initiateUserDbSession(token: string, userId: string, expiryDateUTC: Date): Promise<boolean>
{
    try
    {
        await prisma.sessions.create({
            data: {
                token: token,
                accountId: userId,
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
                accountId: userId
            }
        });
        return true;
    } catch (error) {
        return false;
    }
}

export async function insertAccountDeleteReason(reason: UserDeleteAccountReason, otherReason?: string) : Promise<boolean>
{
    try
    {
        await prisma.accountDeletes.create({
            data: {
                reason: reason,
                otherReason: otherReason
            }
        })
        return true;
    } catch (error) {
        return false;
    }
}

export async function getUserById(userId: string) {
    const result = await prisma.baseAccount.findFirst({
        where: {
            id: userId
        },
        select: {
            email: true,
            emailActivated: true,
            createdAt: true,
            firstName: true,
            lastName: true,
            phone: true,
            designer: true,
            user: true
        }
    });

    return result;
}

export async function changeUserPasswordDb(baseAccountId: string, password: string) {
    try {
        await prisma.baseAccount.update({
            where: {
                id: baseAccountId
            },
            data: {
                password: password
            }
        });
        return true;
    } catch (error) {
        return false;
    }
}

export async function changeUserPasswordThroughEmailDb(email: string, password: string) {
    try {
        await prisma.baseAccount.update({
            where: {
                email: email
            },
            data: {
                password: password
            }
        });
        return true;
    } catch (error) {
        return false;
    }
}

export async function verifyEmailDb(email: string)
{
    try {
        await prisma.baseAccount.update({
            where: {
                email: email
            },
            data: {
                emailActivated: true
            }
        });
        return true;
    } catch (error) {
        return false;
    }
}

export async function addUser (email: string, firstName: string, lastName: string, password: string)
{
    const user = await prisma.users.create({
        data: {
            baseAccount: {
                create: {
                    email: email,
                    firstName: firstName,
                    lastName: lastName,
                    password: password,
                    emailActivated: false,
                }
            }
        },
        select: {
            baseAccount: true,
        }
    });

    return user;
}

//update user data
export const updateUser = async ( uniqueData : Prisma.BaseAccountWhereUniqueInput , data? : Prisma.BaseAccountUpdateInput) => {
    const user = await prisma.baseAccount.update({
        where : uniqueData,
        data : {...data}
    })
    return user 
}
//

export async function deleteBaseAccountWithId(id: string) {
    const result = await prisma.baseAccount.delete({
        where: {
            id: id
        },
    });
    return result;
}

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

export async function getAllUserDataById(id: string) {
    try
    {
    const user = await prisma.baseAccount.findFirst({
        where: {id: id},
        select: {
            avatarUrl: true,
            BirthDate: true,
            createdAt: true,
            email: true,
            emailActivated: true,
            firstName: true,
            lastName: true,
            gender: true,
            id: true,
            phone: true,
            user: {
                select: {
                    age: true,
                    city: true,
                    country: true,
                    stylePreferences: true,
                    bodyMeasurements: true
                }
            },
            designer: {
                select: {
                    about: true,
                    address: true,
                    availabilityTimes: true,
                    categories: true,
                    latitude: true,
                    longtitude: true,
                    premiumSubscription: true,
                    yearsExperience: true,
                    location: true,
                    teamMembers: true,
                    services: true,
                    ordersFinished: true,
                }
            },
        },
    });
    return user;
}
 catch ( error) {
    return false;
 }
}

export async function getUserAvatarURLById(userId: string)
{
    const user = await prisma.baseAccount.findFirst({
        select: {
            avatarUrl: true
        },
        where: {
            id: userId
        }
    });

    return user?.avatarUrl;
}