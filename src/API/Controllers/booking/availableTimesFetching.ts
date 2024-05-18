import { Request, Response } from "express";
import { getDesignerAllAvailableTimes, getDesignerTimezone } from "../../Models/AppointmentsModel";
import { TimeRangeOfDay, convertTimeRanges } from "../../../Utilities/DayShifting";
import { IanaTimeZones } from "../../../Utilities/types/timezones";
import { ResStatus } from "../../Exceptions/main";

export async function handleFetchingDesignerTimes(req: Request, res: Response)
{
    const designerId = req.params.designerId as string;
    const inTimezoneOf = req.query?.timezone? req.query.timezone as string : "Etc/UTC";
    
    const AvailableTimes = await getDesignerAllAvailableTimes(designerId);
    const timezone = await getDesignerTimezone(designerId);

    const requestedTimeZone: IanaTimeZones = inTimezoneOf as IanaTimeZones;
    const designerTimezone: IanaTimeZones = timezone as IanaTimeZones;

    const timeRangesArray: TimeRangeOfDay[] = AvailableTimes.map((el) => {
        return {
            id: el.id,
            dayOfWeek: el.dayOfWeek,
            endTime: el.endTime,
            startTime: el.startTime
        }
    });
    
    const timezoneFitting = convertTimeRanges(timeRangesArray, designerTimezone, requestedTimeZone);
    res.status(ResStatus.OK).json({data: timezoneFitting});
}