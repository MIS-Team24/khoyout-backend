import { parse, format, addDays } from 'date-fns';
import { fromZonedTime as zonedTimeToUtc, toZonedTime as utcToZonedTime } from 'date-fns-tz';
import { IanaTimeZones } from './types/timezones';

export interface TimeRangeOfDay {
id: number,
  startTime: string; // HH:mm:ss
  endTime: string;   // HH:mm:ss
  dayOfWeek: string; // MONDAY, TUESDAY, etc.
}

// Helper to get a dummy date for a specific day of the week
function getDummyDate(dayOfWeek: string): string {
  const baseDate = new Date('2024-01-01'); // 2024-01-01 is a Monday
  const dayIndex = ['SUNDAY', 'MONDAY', 'TUESDAY', 'WEDNESDAY', 'THURSDAY', 'FRIDAY', 'SATURDAY'].indexOf(dayOfWeek.toUpperCase());
  return format(addDays(baseDate, dayIndex), 'yyyy-MM-dd');
}

// Function to convert day of week based on day shift
function shiftDayOfWeek(dayOfWeek: string, shift: number): string {
  const days = ['SUNDAY', 'MONDAY', 'TUESDAY', 'WEDNESDAY', 'THURSDAY', 'FRIDAY', 'SATURDAY'];
  const index = days.indexOf(dayOfWeek.toUpperCase());
  return days[(index + shift + 7) % 7];
}

export function convertTimeRanges(
  timeRanges: TimeRangeOfDay[],
  sourceTimeZone: IanaTimeZones,
  targetTimeZone: IanaTimeZones
): TimeRangeOfDay[] {
  return timeRanges.map(({ startTime, endTime, dayOfWeek, id }) => {
    // Combine the date and time strings with a dummy date for the given day of the week
    const dummyDate = getDummyDate(dayOfWeek);
    const startDateTimeString = `${dummyDate}T${startTime}`;
    const endDateTimeString = `${dummyDate}T${endTime}`;

    // Parse the combined strings to Date objects in the source timezone
    const startDateTime = zonedTimeToUtc(parse(startDateTimeString, 'yyyy-MM-dd\'T\'HH:mm:ss', new Date()), sourceTimeZone);
    const endDateTime = zonedTimeToUtc(parse(endDateTimeString, 'yyyy-MM-dd\'T\'HH:mm:ss', new Date()), sourceTimeZone);

    // Convert the Date objects to the target timezone
    const targetStartDateTime = utcToZonedTime(startDateTime, targetTimeZone);
    const targetEndDateTime = utcToZonedTime(endDateTime, targetTimeZone);

    // Format the Date objects back to the desired format in the target timezone
    const formattedStartTime = format(targetStartDateTime, 'HH:mm:ss');
    const formattedEndTime = format(targetEndDateTime, 'HH:mm:ss');

    // Check if the day of the week has shifted
    const startShift = targetStartDateTime.getUTCDay() - startDateTime.getUTCDay();
    const endShift = targetEndDateTime.getUTCDay() - endDateTime.getUTCDay();

    const adjustedDayOfWeekStart = shiftDayOfWeek(dayOfWeek, startShift);
    const adjustedDayOfWeekEnd = shiftDayOfWeek(dayOfWeek, endShift);

    // Assume shiftDayOfWeek to be valid to handle both shifts
    return {
        id: id,
      startTime: formattedStartTime,
      endTime: formattedEndTime,
      dayOfWeek: adjustedDayOfWeekStart === adjustedDayOfWeekEnd ? adjustedDayOfWeekStart : dayOfWeek // Fallback if there's an unexpected difference
    };
  });
}