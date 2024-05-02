import { prisma  } from "../../Database";
import { Prisma  } from "@prisma/client";


//check if user exist (using email checking)
export const isUserExist = async (email : string) : Promise<boolean> => {
    const user = await prisma.users.findUnique({
        where :{
            email : email
        }
    })

    if(user) return true

    return false
}

//create user
export const addUser = async (data : Prisma.UsersCreateInput) : Promise<object> => {
    const user : object = await prisma.users.create({data})
    return user
}