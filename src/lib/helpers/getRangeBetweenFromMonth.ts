import dayjs from "dayjs";

export interface IGetRangeBetweenFromMonthResult {
  startOfMonth: string;
  endOfMonth: string;
}

export function getRangeBetweenFromMonth(
  month?: string
): IGetRangeBetweenFromMonthResult {
  const monthParam = month || dayjs().format("YYYY-MM-DD");
  const startOfMonth = dayjs(monthParam).startOf("month").format("YYYY-MM-DD");
  const endOfMonth = dayjs(monthParam)
    .endOf("month")
    .format("YYYY-MM-DD 23:59:59.999");

  return {
    startOfMonth,
    endOfMonth,
  };
}
