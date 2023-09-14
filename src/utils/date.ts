/* eslint-disable no-useless-escape */
import dayjs from "dayjs";
import "dayjs/locale/ko";

dayjs.locale("ko");

export const formatYYMMDD = (date: Date) => {
  return dayjs(date).format("YYYY.MM.DD");
};

export const getFirstDayOfWeek = (): { month: number; day: number } => {
  return { month: dayjs().startOf("week").month() + 1, day: Number(dayjs().startOf("week").format("DD")) };
};

export const checkValidDate = (value: string) => {
  let result = true;

  try {
    const date = value.split("-");
    const year = parseInt(date[0], 10);
    const month = parseInt(date[1], 10);
    const day = parseInt(date[2], 10);

    const dateRegex =
      /^(?=\d)(?:(?:31(?!.(?:0?[2469]|11))|(?:30|29)(?!.0?2)|29(?=.0?2.(?:(?:(?:1[6-9]|[2-9]\d)?(?:0[48]|[2468][048]|[13579][26])|(?:(?:16|[2468][048]|[3579][26])00)))(?:\x20|$))|(?:2[0-8]|1\d|0?[1-9]))([-.\/])(?:1[012]|0?[1-9])\1(?:1[6-9]|[2-9]\d)?\d\d(?:(?=\x20\d)\x20|$))?(((0?[1-9]|1[012])(:[0-5]\d){0,2}(\x20[AP]M))|([01]\d|2[0-3])(:[0-5]\d){1,2})?$/;
    result = dateRegex.test(day + "-" + month + "-" + year);
  } catch (err) {
    result = false;
  }
  return result;
};

export { dayjs };
