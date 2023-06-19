import dayjs from "dayjs";
import "dayjs/locale/ko";

dayjs.locale("ko");

export const formatYYMMDD = (date: Date) => {
  return dayjs(date).format("YYYY.MM.DD");
};

export { dayjs };
