import { prisma  } from "../../Database";
import { Prisma  } from "@prisma/client";
import { bodyMeasurementType } from "../Controllers/user/updateBodyMeasurementController";

export async function updateBodyMeasurements(userId: string, bodyMeasurement: bodyMeasurementType)
{
    try
    {
        await prisma.bodyMeasurements.upsert({
            where: {userId: userId},
            create: {
                aboveKnee: bodyMeasurement.aboveKnee,
                arms: bodyMeasurement.arms,
                belly: bodyMeasurement.belly,
                belowKnee: bodyMeasurement.belowKnee,
                body_shape: bodyMeasurement.body_shape,
                calf: bodyMeasurement.calf,
                chest: bodyMeasurement.chest,
                forearms: bodyMeasurement.forearms,
                hips: bodyMeasurement.hips,
                length: bodyMeasurement.length,
                neck: bodyMeasurement.neck,
                shoulderWidth: bodyMeasurement.shoulderWidth,
                thigh: bodyMeasurement.thigh,
                waist: bodyMeasurement.waist,
                wrists: bodyMeasurement.wrists,
                weight: bodyMeasurement.weight,
                userId: userId
            },
            update: {
                aboveKnee: bodyMeasurement.aboveKnee,
                arms: bodyMeasurement.arms,
                belly: bodyMeasurement.belly,
                belowKnee: bodyMeasurement.belowKnee,
                body_shape: bodyMeasurement.body_shape,
                calf: bodyMeasurement.calf,
                chest: bodyMeasurement.chest,
                forearms: bodyMeasurement.forearms,
                hips: bodyMeasurement.hips,
                length: bodyMeasurement.length,
                neck: bodyMeasurement.neck,
                shoulderWidth: bodyMeasurement.shoulderWidth,
                thigh: bodyMeasurement.thigh,
                waist: bodyMeasurement.waist,
                wrists: bodyMeasurement.wrists,
                weight: bodyMeasurement.weight,
            }
        });
        return true;
    } catch (error) {
        return false;
    }
}