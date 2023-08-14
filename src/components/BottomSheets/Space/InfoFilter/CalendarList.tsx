"use client";

import { type MouseEventHandler, useEffect } from "react";

import { range } from "lodash-es";

import type { Holiday, MonthHoliday } from "@/common/types/holiday";
import { useSuspenseInfiniteQuery } from "@/hooks";
import { paginateHolidaysApi } from "@/services/holiday";
import { dayjs } from "@/utils/date";

import MonthCalendar, {
  type ActiveDate,
  type DateInfo,
  LoadingMonthCalendar,
} from "../../_shared/Calendar/MonthCalendar";

import styles from "./calendarList.module.scss";

const getMonthInfos = (year: string, month: string, holidays: Holiday[]): DateInfo[] => {
  const days = dayjs(`${year}-${month}-01`).daysInMonth();
  return range(1, days + 1).map((day) => {
    const isHoliday = holidays.find((holiday) => holiday.day === day.toString());
    return { day: day.toString(), isHoliday: Boolean(isHoliday), isPossible: true };
  });
};

interface Props {
  activeDate: ActiveDate;
  onClickDay: (year: string, month: string, day: string) => MouseEventHandler<HTMLButtonElement>;
}

const CalendarList: React.FC<Props> = ({ activeDate, onClickDay }) => {
  const { isSuccess, hasNextPage, isFetching, fetchNextPage, data } = useSuspenseInfiniteQuery<MonthHoliday>(
    ["paginateHolidays"],
    ({ pageParam = 1 }) =>
      paginateHolidaysApi({
        page: pageParam,
        limit: 1,
        maxSize: 6,
        startYear: dayjs().year().toString(),
        startMonth: (dayjs().month() + 1).toString(),
      }),
  );

  useEffect(() => {
    if (isSuccess && hasNextPage && !isFetching) fetchNextPage();
  }, [fetchNextPage, hasNextPage, isFetching, isSuccess]);

  return (
    <ol className={styles.calendarWrapper}>
      {data.pages.map((page) => (
        <MonthCalendar
          key={`${page.year}-${page.month}`}
          month={page.month}
          year={page.year}
          activeDate={activeDate}
          infos={getMonthInfos(page.year, page.month, page.holidays)}
          onClickDay={onClickDay}
        />
      ))}
      {isFetching && <LoadingMonthCalendar />}
    </ol>
  );
};

export default CalendarList;

export const LoadingCalendarList: React.FC = () => {
  return (
    <ol className={styles.calendarWrapper}>
      <LoadingMonthCalendar />
    </ol>
  );
};
