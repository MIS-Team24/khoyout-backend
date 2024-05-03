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

//create user
export const addUser = async (data : Prisma.UsersCreateInput) : Promise<object> => {
    const user : object = await prisma.users.create({data})
    return user
}
//