import dayjs from "dayjs";
import "dayjs/locale/ko";

dayjs.locale("ko");

export const formatYYMMDD = (date: Date) => {
  return dayjs(date).format("YYYY.MM.DD");
};

export const formatHourToAHHMM = (hour: number) => {
  if (hour === 24) return "오전 0";
  if (hour > 12 && hour < 23) return `오후 ${hour - 12}`;
  return `오전 ${hour}`;
};

export { dayjs };
