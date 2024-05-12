import { prisma  } from "../../Database";
import { Prisma  } from "@prisma/client";

export const updateStylePreference = (uniqueData : Prisma.StylePreferencesWhereUniqueInput , data : Prisma.StylePreferencesUpdateInput ) =>{
    const user = prisma.stylePreferences.update({
        where : uniqueData,
        data : data
    })
    return user
}
