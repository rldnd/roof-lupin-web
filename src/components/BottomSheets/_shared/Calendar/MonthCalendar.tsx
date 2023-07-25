"use client";

import type { MouseEventHandler } from "react";

import { range } from "lodash-es";

import { dayjs, getFirstDayOfWeek } from "@/utils/date";

import MonthCalendarItem from "./MonthCalendarItem";

import styles from "./monthCalendar.module.scss";

interface Props {
  year: string;
  month: string;
  onClickDay: MouseEventHandler<HTMLButtonElement>;
}

const MonthCalendar: React.FC<Props> = ({ year, month, onClickDay }) => {
  const isCurrentMonth = dayjs().year() === Number(year) && dayjs().month() + 1 === Number(month);

  return (
    <section className={styles.wrapper}>
      <h2 className={styles.yearMonth}>
        {year}년 {month}월
      </h2>
      <ol className={styles.dayList}>
        {!isCurrentMonth &&
          range(dayjs(`${year}-${month}-1`).startOf("month").day()).map((value) => <li key={`empty-day-${value}`} />)}
        {range(dayjs(`${year}-${month}-1`).daysInMonth()).map((value) => {
          const day = value + 1;
          if (isCurrentMonth && day < getFirstDayOfWeek()) return null;
          return <MonthCalendarItem key={`${year}-${month}-${day}`} year={year} month={month} day={day.toString()} />;
        })}
      </ol>
    </section>
  );
};

export default MonthCalendar;
