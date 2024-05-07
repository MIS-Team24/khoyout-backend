import { Prisma } from "@prisma/client";
import { prisma } from "../../Database";

//add new otp code record in the database
export const addNewOtp = async (data : Prisma.OtpsCreateInput) =>  {
    const OtpRecord = await prisma.otps.create({data})
    return OtpRecord
}
//

//find otp by id
export const findOtpById = async (id : string) =>  {
    const OtpRecord = await prisma.otps.findUnique({
        where : {
            id
        }
    })
    return OtpRecord
}
//