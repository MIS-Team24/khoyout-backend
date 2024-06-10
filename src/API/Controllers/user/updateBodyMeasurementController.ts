import { Request, Response } from "express";
import { UserBody } from "../../types/auth";
import { ErrorCode , ResStatus } from "../../Exceptions/main";
import { errorResponseTemplate } from "../../../Services/responses/ErrorTemplate";
import { BadRequestException } from "../../Exceptions/badRequest";
import { Messages } from "../../../Services/responses/Messages";
import { updateBodyMeasurements } from "../../Models/BodyMeasurementsModel";
import { z } from "zod";

export const bodyMeasurementsSchema = z.object({
    body_shape: z
      .string()
      .min(2, {
        message: "Body Shape must be between 2 characters and 50 characters",
      })
      .max(50),
    weight: z.coerce
      .number()
      .positive()
      .gte(0, { message: "The value must be greater than 0" }),
    length: z.coerce
      .number()
      .positive()
      .gte(0, { message: "The value must be greater than 0" }),
    shoulderWidth: z.coerce
      .number()
      .positive()
      .gte(0, { message: "The value must be greater than 0" }),
    neck: z.coerce
      .number()
      .positive()
      .gte(0, { message: "The value must be greater than 0" }),
    chest: z.coerce
      .number()
      .positive()
      .gte(0, { message: "The value must be greater than 0" }),
    arms: z.coerce
      .number()
      .positive()
      .gte(0, { message: "The value must be greater than 0" }),
    forearms: z.coerce
      .number()
      .positive()
      .gte(0, { message: "The value must be greater than 0" }),
    wrists: z.coerce
      .number()
      .positive()
      .gte(0, { message: "The value must be greater than 0" }),
    waist: z.coerce
      .number()
      .positive()
      .gte(0, { message: "The value must be greater than 0" }),
    hips: z.coerce
      .number()
      .positive()
      .gte(0, { message: "The value must be greater than 0" }),
    thigh: z.coerce
      .number()
      .positive()
      .gte(0, { message: "The value must be greater than 0" }),
    belly: z.coerce
      .number()
      .positive()
      .gte(0, { message: "The value must be greater than 0" }),
      aboveKnee: z.coerce
      .number()
      .positive()
      .gte(0, { message: "The value must be greater than 0" }),
      belowKnee: z.coerce
      .number()
      .positive()
      .gte(0, { message: "The value must be greater than 0" }),
    calf: z.coerce
      .number()
      .positive()
      .gte(0, { message: "The value must be greater than 0" }),
  });

export type bodyMeasurementType = z.infer<typeof bodyMeasurementsSchema>;

export const updateBodyMeasurementData = async (req : Request , res : Response) => {
    const user = req?.user as UserBody
    const userUpdated = await updateBodyMeasurements(user.id , req.body)
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