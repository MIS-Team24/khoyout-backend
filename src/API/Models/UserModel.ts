import { prisma  } from "../../Database";
import { Prisma  } from "@prisma/client";
import { UserBody } from "../types/auth/auth";

//find by unique attribute
export const findUserBy = async (data : Prisma.UsersWhereUniqueInput) => {
    const user = await prisma.users.findUnique({
        where : data
    })
    return user 
}
//

//create user
export const addUser = async (data : Prisma.UsersCreateInput) => {
    const user : object = await prisma.users.create({data})
    return user as UserBody
}
//

//reset password
export const resetPassword = async (data : Prisma.UsersUpdateInput , email : string) => {
    return await prisma.users.update({
        where : {
            email
        },
        data : {
            password : data.password
        }
    })
}
//

//verify email
export const verifyEmail = async (email : string) => {
    const user : object = await prisma.users.update({
        where : {
            email
        },
        data : {
            emailActivated:true
        }
    })
    return user 
}

//update user data
export const updateUser = async ( uniqueData : Prisma.UsersWhereUniqueInput , data? : Prisma.UsersUpdateInput) => {
    const user : object = await prisma.users.update({
        where : uniqueData,
        data : {...data}
    })
    return user 
}
//

//update user data
export const deleteUser = async (data : Prisma.UsersWhereUniqueInput) => {
    const user : object = await prisma.users.delete({
        where : data
    })
    return user 
}
//