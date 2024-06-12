import { Prisma } from "@prisma/client";
import { prisma } from "../../Database";
import { createServiceType } from "../Controllers/designer/service/createDesignerService";

export const addService = async (designerId: string, data: createServiceType) => {
    const service = await prisma.service.create({
        data : {
            description : data.description,
            price : data.price,
            title : data.title,
            designerId: designerId
        }
    })
    return service
}

export const updateServiceByID = async (designerId: string, id : string , data : createServiceType) => {
    const serviceUpdated = await prisma.service.update({
        where : {id: id, designerId: designerId},
        data : {
            price: data.price,
            title: data.title,
            description: data.description
        }
    })
    return serviceUpdated
}
