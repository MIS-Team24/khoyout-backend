import { prisma  } from "../../Database";
import { Prisma  } from "@prisma/client";

export const updateBodyMeasurement = (uniqueData : Prisma.BodyMeasurementsWhereUniqueInput , data : Prisma.BodyMeasurementsUpdateInput ) =>{
    const user = prisma.bodyMeasurements.update({
        where : uniqueData,
        data : data
    })
    return user
}
