import { Prisma } from "@prisma/client";
import { prisma } from "../../Database";

export const addService = async (data : Prisma.ServiceCreateInput) => {
    const service = await prisma.service.create({
        data : {
            description : data.description,
            price : data.price,
            title : data.title,
            designer : {
                connect :{
                    baseAccountId : data.designer.connect?.baseAccountId
                } 
            }
        }
    })
    return service
}

export const updateServiceByID = async (id : string , data : Prisma.ServiceUpdateInput) => {
    const serviceUpdated = await prisma.service.update({
        where : {id},
        data : {
            designer : {
                update : {baseAccountId : data.designer?.update?.baseAccountId}
            }
        }
    })
    return serviceUpdated
}
