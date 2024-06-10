import { Request, Response } from "express";
import { ErrorCode, ResStatus } from "../../Exceptions/main";
import { ZodError } from "zod";
import { BadRequestException } from "../../Exceptions/badRequest";
import { errorResponseTemplate } from "../../../Services/responses/ErrorTemplate";
import { Messages } from "../../../Services/responses/Messages";
import { createAvailableTime, deleteAvailableTime } from "../../Models/BookingModel";
import { DayOfWeek } from "@prisma/client";

export async function handleCreateAvailbityTime(req: Request, res: Response)
{
    try
    {
        const designer = req.user;
        if (!designer) {
            return res.sendStatus(401);
        }
        const typedAssertedBody = req.body as {
            startTime: string,
            endTime: string,
            day: DayOfWeek
        };
        const e = await createAvailableTime(designer.id, typedAssertedBody.startTime, typedAssertedBody.endTime, typedAssertedBody.day);
        if (!e) {
            return res.sendStatus(ResStatus.I_SERVER_ERROR);
        }

        return res.status(ResStatus.OK).send({message: "Successfully created time.", id: e});
    } catch (error) {
        if (error instanceof ZodError) {
            const errorMessages = error.errors.map((issue: any) => ({
                message: `${issue.path.join('.')} is ${issue.message}`,
            }));

            return res.status(ResStatus.BAD_REQUEST).json(errorResponseTemplate(
                new BadRequestException(Messages.INVALID_DATA, ErrorCode.INVALID_DATA, {isDataValid : false , error : errorMessages})
            ))
        }
    }
}

export async function deleteAvailbilityTime(req: Request, res: Response)
{
    try
    {
        const id = Number(req.params.id);

        if (!(id >= 0 && id <= Number.MAX_SAFE_INTEGER && Number.isInteger(id))) {
            return res.status(ResStatus.BAD_REQUEST).json(errorResponseTemplate(
                new BadRequestException(Messages.INVALID_DATA, ErrorCode.INVALID_DATA, {isDataValid : false})
            ))
        }

        const designer = req.user;
        if (!designer) {
            return res.sendStatus(401);
        }

        await deleteAvailableTime(designer.id, id)
        res.status(ResStatus.OK).send({message: "Successsfully Deleted Available Time"});
    } catch (error) {
        if (error instanceof ZodError) {
            const errorMessages = error.errors.map((issue: any) => ({
                message: `${issue.path.join('.')} is ${issue.message}`,
            }));

            return res.status(ResStatus.BAD_REQUEST).json(errorResponseTemplate(
                new BadRequestException(Messages.INVALID_DATA, ErrorCode.INVALID_DATA, {isDataValid : false , error : errorMessages})
            ))
        }
    }
}