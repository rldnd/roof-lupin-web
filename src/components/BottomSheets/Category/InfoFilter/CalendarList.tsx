"use client";

import { type MouseEventHandler, useEffect } from "react";

import type { PossibleRentalTypesByMonth } from "@/common/types/rentalType";
import { useSuspenseInfiniteQuery } from "@/hooks";
import { paginateSpaceRentalTypePossibleMonthApi } from "@/services/rentalType";
import { dayjs } from "@/utils/date";

import { MonthCalendar } from "../../_shared";
import { type ActiveDate, LoadingMonthCalendar } from "../../_shared/Calendar/MonthCalendar";

import styles from "./calendarList.module.scss";

interface Props {
  activeDate: ActiveDate;
  onClickDay: (year: string, month: string, day: string) => MouseEventHandler<HTMLButtonElement>;
}

const CalendarList: React.FC<Props> = ({ activeDate, onClickDay }) => {
  return (
    <ol className={styles.calendarWrapper}>
      {/* {data.pages.map((page) => (
        <MonthCalendar
          key={`${page.year}-${page.month}`}
          month={page.month}
          year={page.year}
          activeDate={activeDate}
          infos={page.days}
          onClickDay={onClickDay}
        />
      ))}
      {isFetching && <LoadingMonthCalendar />} */}
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
