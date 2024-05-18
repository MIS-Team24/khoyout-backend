import { DayOfWeek } from '@prisma/client';
import { format, parse } from 'date-fns';
import { toZonedTime, fromZonedTime,  } from 'date-fns-tz';

export function getUTCTime() : Date
{
    return new Date(new Date().toUTCString())
}

export function addHoursToDate(date: Date, hours: number): Date {
    const result = new Date(date);
    result.setHours(result.getHours() + hours);
    return result;
}

export function convertFromTimezoneToUTC(date: string, timeOfDay: string, timezone: string): Date {
    const dateTimeString = `${date}T${timeOfDay}`;

    const dateTime = parse(dateTimeString, 'yyyy-MM-dd\'T\'HH:mm:ss', new Date())

    const utcDate = fromZonedTime(dateTime, timezone);

    return utcDate;
}

export function updateDateKeepTime(date: Date, dateString: string): Date {
    // Parse the date string
    const [year, month, day] = dateString.split('-').map(Number);
    
    // Get the time values from the existing date object
    const hours = date.getHours();
    const minutes = date.getMinutes();
    const seconds = date.getSeconds();
    const milliseconds = date.getMilliseconds();
    
    // Create a new date object with the parsed date and existing time values
    const updatedDate = new Date(year, month - 1, day, hours, minutes, seconds, milliseconds);
    
    return updatedDate;
}

export function getDayOfWeek(dateInput: string | Date): DayOfWeek {
    const date = typeof dateInput === 'string' ? new Date(dateInput) : dateInput;

    const daysOfWeek: DayOfWeek[] = ["SUNDAY", "MONDAY", "TUESDAY", "WEDNESDAY", "THURSDAY", "FRIDAY", "SATURDAY"];

    const dayIndex = date.getDay();

    return daysOfWeek[dayIndex];
}
