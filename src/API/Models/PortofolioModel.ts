import { Prisma } from "@prisma/client";
import { prisma } from "../../Database";

export const addPortofolioFile = async (data : Prisma.PortfolioCreateInput) => {
    const portofolioFile = await prisma.portfolio.create({
        data : {
            url : data.url ,
            designer : {
                connect :{
                    baseAccountId : data.designer.connect?.baseAccountId
                } 
            }
        }
    })
    return portofolioFile
}

export const updatePortofolioFileByID = async (id : string , data : Prisma.PortfolioUpdateInput) => {
    const portofolioFileUpdated = await prisma.portfolio.update({
        where : {id},
        data : {
            designer : {
                update : {baseAccountId : data.designer?.update?.baseAccountId}
            }
        }
    })
    return portofolioFileUpdated
}

export const deletePortofolioFileByID = async (id : string) => {
    const portofolioFileDeleted = await prisma.portfolio.delete({
        where : {id}
    })
    return portofolioFileDeleted
}