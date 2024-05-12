import { prisma  } from "../../Database";
import { Prisma  } from "@prisma/client";
import { UserBody } from "../types/auth";

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
        where : data
    })
    return user 
}
//