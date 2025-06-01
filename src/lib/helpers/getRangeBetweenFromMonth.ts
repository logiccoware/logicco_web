import dayjs from "dayjs";

export interface IGetRangeBetweenFromMonthResult {
  startOfMonth: string;
  endOfMonth: string;
}

export function getRangeBetweenFromMonth(
  month?: string
): IGetRangeBetweenFromMonthResult {
  const base = month ? dayjs(month) : dayjs();
  const startOfMonth = base.startOf("month").format("YYYY-MM-DD");
  const endOfMonth = base.endOf("month").format("YYYY-MM-DD 23:59:59.999");

  return {
    startOfMonth,
    endOfMonth,
  };
}
