"use client";

import type { MouseEventHandler } from "react";

import { range } from "lodash-es";
import Skeleton from "react-loading-skeleton";

import { dayjs, getFirstDayOfWeek } from "@/utils/date";

import MonthCalendarItem from "./MonthCalendarItem";

import styles from "./monthCalendar.module.scss";

export interface ActiveDate {
  year: number;
  month: number;
  day: number;
}

export interface DateInfo {
  day: number;
  isHoliday: boolean;
  isPossible: boolean;
}

interface Props {
  year: number;
  month: number;
  infos: DateInfo[];
  activeDate: ActiveDate;
  onClickDay: (year: number, month: number, day: number) => MouseEventHandler<HTMLButtonElement>;
}

const MonthCalendar: React.FC<Props> = ({ year, month, infos, activeDate, onClickDay }) => {
  const isCurrentMonth = dayjs().year() === Number(year) && dayjs().month() + 1 === Number(month);
  const { month: firstDayOfWeekMonth, day: firstDayOfWeekDay } = getFirstDayOfWeek();

  const isTodayFirstWeek =
    ((dayjs().set("date", 1).day() === 0 && firstDayOfWeekMonth === month) || firstDayOfWeekMonth + 1 === month) &&
    dayjs().date() <= 7 - dayjs().startOf("month").day();

  return (
    <li className={styles.wrapper}>
      <h2 className={styles.yearMonth}>
        {year}년 {month}월
      </h2>
      <ol className={styles.dayList}>
        {((isCurrentMonth && isTodayFirstWeek) || !isCurrentMonth) &&
          range(dayjs(`${year}-${month}-1`).startOf("month").day()).map((value) => <li key={`empty-day-${value}`} />)}
        {range(dayjs(`${year}-${month}-1`).daysInMonth()).map((value) => {
          const day = value + 1;
          const active = activeDate.year === year && activeDate.month === month && activeDate.day === day;
          const info = infos.find((info) => info.day === day);

          if (isCurrentMonth && month === firstDayOfWeekMonth && day < firstDayOfWeekDay) return null;

          return (
            <MonthCalendarItem
              active={active}
              isBeforeToday={month === dayjs().month() + 1 && day < dayjs().date()}
              isHoliday={info?.isHoliday ?? false}
              isPossible={info?.isPossible ?? true}
              key={`${year}-${month}-${day}`}
              year={year}
              month={month}
              day={day}
              onClick={onClickDay(year, month, day)}
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
