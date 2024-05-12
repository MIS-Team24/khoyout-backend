import { prisma  } from "../../Database";
import { Prisma  } from "@prisma/client";

//get all designers
export const readAllDesigners = async () => {
    const designers = await prisma.designer.findMany({
        include : {
            portfolios : true,
            categories : true,
            reviews : true,
            services : true,
            teamMembers : true
        }
    })
    return designers
}
//

//get specific designer
export const findDesignerBy = async (data : Prisma.DesignerWhereUniqueInput) => {
    const designer = await prisma.designer.findUnique({
        where : data ,
        include : {
            portfolios : true,
            categories : true,
            reviews : true,
            services : true
        }
    })
    return designer
}
//