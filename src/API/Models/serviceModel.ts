import { Prisma } from "@prisma/client";
import { prisma } from "../../Database";

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
