export function getUTCTime() : Date
{
    return new Date(new Date().toUTCString())
}

export function addHoursToDate(date: Date, hours: number): Date {
    const result = new Date(date);
    result.setHours(result.getHours() + hours);
    return result;
}