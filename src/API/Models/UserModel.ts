import { prisma  } from "../../Database";
import { Prisma  } from "@prisma/client";

//check if user exist and return that user (using email checking) 
export const findUserByEmail = async (email : string) => {
    const user = await prisma.users.findUnique({
        where : {
            email
        }
    })
    return user  
}
//

//find by id
export const findUserById = async (id : string) => {
    const user = await prisma.users.findUnique({
        where : {
            id
        }
    })
    return user  
}
//

//create user
export const addUser = async (data : Prisma.UsersCreateInput) => {
    const user : object = await prisma.users.create({data})
    return user
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
//