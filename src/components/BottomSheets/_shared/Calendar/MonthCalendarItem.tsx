"use client";

import { memo } from "react";

import { dayjs, getFirstDayOfWeek } from "@/utils/date";

import styles from "./monthCalendarItem.module.scss";

export interface Props {
  year: string;
  month: string;
  day: string;
}

const MonthCalendarItem: React.FC<Props> = ({ year, month, day }) => {
  // const isBeforeTodayWeek = dayjs(`${year}-${month}-${day}`);
  // // const (dayjs().set("date", getFirstDayOfWeek()));
  // const isBeforeToday = dayjs(`${year}-${month}-${day}`).isBefore(
  //   `${dayjs().year()}-${dayjs().month() + 1}-${dayjs().date()}`,
  // );

  return (
    <li className={styles.wrapper}>
      <button type="button">
        <time dateTime={`${year}년 ${month}월 ${day}일`}>{day}</time>
      </button>
    </li>
  );
};

export default memo(MonthCalendarItem);
