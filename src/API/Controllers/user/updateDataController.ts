import { Request, Response } from "express";
import { UserBody } from "../../types/auth";
import { updateUser } from "../../Models/UserModel";
import { ErrorCode , ResStatus } from "../../Exceptions/main";
import { errorResponseTemplate } from "../../../Services/responses/ErrorTemplate";
import { BadRequestException } from "../../Exceptions/badRequest";
import { Messages } from "../../../Services/responses/Messages";
import { z } from "zod";
import { prisma } from "../../../Database";

export const updateUserData = async (req : Request , res : Response) => {
    const user = req?.user as UserBody
    const userUpdated = await updateUser({id : user?.id} , req.body)
    if(!userUpdated){
        return res.status(ResStatus.BAD_REQUEST).json(errorResponseTemplate(
            new BadRequestException(Messages.USER_NOT_FOUND 
                , ErrorCode.USER_NOT_FOUND)
        ))  
    }
    return res.status(ResStatus.OK).json({
        message : Messages.USER_UPDATED,
        isUserDataUpdated : true
    })
}

export const basicDesignerDataUpdateSchema = z.object({
    first_name: z
      .string()
      .min(2, {
        message: "Please enter your first name, must be at least 2 characters.",
      })
      .trim(),
    last_name: z
      .string()
      .min(2, {
        message: "Please enter your last name must be at least 2 characters.",
      })
      .trim(),
    bio: z
      .string()
      .min(2, {
        message: "Please enter your last name must be at least 2 characters.",
      })
      .trim(),
    phone_number: z
      .string()
      .regex(/^\+20\d{10}$/, {
        message:
          "Invalid phone number format. Please provide a valid phone number with the +20 country code.",
      })
      .trim(),
    email: z
      .string()
      .email({
        message: "Invalid email format. Please provide a valid email address.",
      })
      .trim(),
    experience: z.coerce
      .number()
      .positive()
      .gte(0, { message: "Age must be greater than 0" }),
    date: z.coerce.date({
      required_error: "A date of birth is required.",
    }),
    gender: z
      .string()
      .min(2, {
        message: "Please enter your gender",
      })
      .trim(),
    country: z
      .string()
      .min(2, {
        message: "Please enter your country",
      })
      .trim(),
    city: z
      .string()
      .min(2, {
        message: "Please enter your city",
      })
      .trim(),
  });

export async function designerUpdateBasicInfo(req : Request , res : Response)
{
    const user = req?.user as UserBody
    const assertedBody = req.body as {
        bio: string,
        city: string,
        country: string,
        date: Date,
        email: string,
        experience: number,
        first_name: string,
        gender: string,
        last_name: string,
        phone_number: string,
    };
    
    const result = await prisma.baseAccount.updateMany({
        where: {
            id: user.id
        },
        data: {
            firstName: assertedBody.first_name,
            lastName: assertedBody.last_name,
            phone: assertedBody.phone_number,
            gender: assertedBody.gender === "Male"? "Male" : "Female",
            BirthDate: assertedBody.date,
        }
    });

    const result2 = await prisma.designerProfile.updateMany({
        where: {
            baseAccountId: user.id
        },
        data: {
            about: assertedBody.bio,
            location: assertedBody.city,
            address: assertedBody.country
        }
    })
    
    if(!(result.count && result.count)){
        return res.status(ResStatus.BAD_REQUEST).json(errorResponseTemplate(
            new BadRequestException(Messages.USER_NOT_FOUND, ErrorCode.USER_NOT_FOUND)
        ))  
    }

    return res.status(ResStatus.OK).json({
        message : Messages.USER_UPDATED,
        isUserDataUpdated : true
    });
}