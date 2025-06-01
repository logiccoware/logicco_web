import dayjs from "dayjs";
import utc from "dayjs/plugin/utc";
import timezone from "dayjs/plugin/timezone";

dayjs.extend(utc);
dayjs.extend(timezone);

export interface IGetRangeBetweenFromMonthResult {
  startOfMonth: string;
  endOfMonth: string;
}

export function getRangeBetweenFromMonth(
  month?: string
): IGetRangeBetweenFromMonthResult {
  const tz = "America/Winnipeg";
  const base = month ? dayjs.tz(month, tz) : dayjs().tz(tz);
  const startOfMonth = base.startOf("month").format("YYYY-MM-DD");
  const endOfMonth = base.endOf("month").format("YYYY-MM-DD 23:59:59.999");

  return {
    startOfMonth,
    endOfMonth,
  };
}
