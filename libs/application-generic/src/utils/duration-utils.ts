export class DurationUtils {
  static isISO8601(value: string): boolean {
    const iso8601Regex = /^(\d{4})-(\d{2})-(\d{2})T(\d{2}):(\d{2}):(\d{2})(\.\d{1,3})?Z?$/;
    const match = iso8601Regex.exec(value);
    if (!match) {
      return false;
    }

    const [, yearStr, monthStr, dayStr, hourStr, minuteStr, secondStr] = match;
    const year = Number(yearStr);
    const month = Number(monthStr);
    const day = Number(dayStr);
    const hour = Number(hourStr);
    const minute = Number(minuteStr);
    const second = Number(secondStr);

    const utcDate = new Date(Date.UTC(year, month - 1, day, hour, minute, second));
    if (
      Number.isNaN(utcDate.getTime()) ||
      utcDate.getUTCFullYear() !== year ||
      utcDate.getUTCMonth() + 1 !== month ||
      utcDate.getUTCDate() !== day ||
      utcDate.getUTCHours() !== hour ||
      utcDate.getUTCMinutes() !== minute ||
      utcDate.getUTCSeconds() !== second
    ) {
      return false;
    }

    const date = new Date(value);

    return !Number.isNaN(date.getTime());
  }

  static convertToMilliseconds(amount: number, unit: string): number {
    const unitMap: Record<string, number> = {
      seconds: 1000,
      minutes: 60 * 1000,
      hours: 60 * 60 * 1000,
      days: 24 * 60 * 60 * 1000,
      weeks: 7 * 24 * 60 * 60 * 1000,
      months: 30 * 24 * 60 * 60 * 1000,
    };

    if (!unitMap[unit]) {
      throw new Error(`Invalid time unit '${unit}'. Supported units: ${Object.keys(unitMap).join(', ')}`);
    }

    return amount * unitMap[unit];
  }
}
