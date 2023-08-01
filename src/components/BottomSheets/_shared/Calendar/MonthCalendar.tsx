"use client";

import type { MouseEventHandler } from "react";

import { range } from "lodash-es";
import Skeleton from "react-loading-skeleton";

import { dayjs, getFirstDayOfWeek } from "@/utils/date";

import MonthCalendarItem from "./MonthCalendarItem";

import styles from "./monthCalendar.module.scss";

export interface ActiveDate {
  year: string;
  month: string;
  day: string;
}

export interface DateInfo {
  day: string;
  isHoliday: boolean;
  isPossible: boolean;
}

interface Props {
  year: string;
  month: string;
  infos: DateInfo[];
  activeDate: ActiveDate;
  onClickDay: (year: string, month: string, day: string) => MouseEventHandler<HTMLButtonElement>;
}

const MonthCalendar: React.FC<Props> = ({ year, month, infos, activeDate, onClickDay }) => {
  const isCurrentMonth = dayjs().year() === Number(year) && dayjs().month() + 1 === Number(month);
  const { month: firstDayOfWeekMonth, day: firstDayOfWeekDay } = getFirstDayOfWeek();
  const isFirstWeek =
    firstDayOfWeekMonth === dayjs().month() + 1 && dayjs().date() <= 7 - dayjs().startOf("month").day();

  return (
    <li className={styles.wrapper}>
      <h2 className={styles.yearMonth}>
        {year}년 {month}월
      </h2>
      <ol className={styles.dayList}>
        {(!isCurrentMonth || !isFirstWeek) &&
          range(dayjs(`${year}-${month}-1`).startOf("month").day()).map((value) => <li key={`empty-day-${value}`} />)}
        {range(dayjs(`${year}-${month}-1`).daysInMonth()).map((value) => {
          const day = value + 1;
          const active = activeDate.year === year && activeDate.month === month && activeDate.day === day.toString();
          const info = infos.find((info) => info.day === day.toString());

          if (isCurrentMonth && month === firstDayOfWeekMonth.toString() && day < firstDayOfWeekDay) return null;

          return (
            <MonthCalendarItem
              active={active}
              isBeforeToday={isCurrentMonth && day >= firstDayOfWeekDay && day < dayjs().date()}
              isHoliday={info?.isHoliday ?? false}
              isPossible={info?.isPossible ?? true}
              key={`${year}-${month}-${day}`}
              year={year}
              month={month}
              day={day.toString()}
              onClick={onClickDay(year, month, day.toString())}
            />
          );
        })}
      </ol>
    </li>
  );
};

export default MonthCalendar;

export const LoadingMonthCalendar: React.FC = () => {
  return (
    <section className={styles.wrapper}>
      <Skeleton width={100} className={styles.yearMonth} />
      <ol className={styles.dayList}>
        {range(30).map((value) => {
          return (
            <Skeleton
              containerClassName={styles.loadingItem}
              key={value}
              width={40}
              height={40}
              style={{ borderRadius: "50%" }}
            />
          );
        })}
      </ol>
    </section>
  );
};
