"use client";

import { memo, MouseEventHandler } from "react";

import cx from "clsx";

import styles from "./monthCalendarItem.module.scss";

export interface Props {
  year: number;
  month: number;
  day: number;
  isBeforeToday: boolean;
  active: boolean;
  isPossible: boolean;
  isHoliday: boolean;
  onClick: MouseEventHandler<HTMLButtonElement>;
}

const MonthCalendarItem: React.FC<Props> = ({
  year,
  month,
  day,
  active,
  isBeforeToday,
  isPossible,
  isHoliday,
  onClick,
}) => {
  return (
    <li className={styles.wrapper}>
      <button
        type="button"
        disabled={!isPossible || isBeforeToday}
        onClick={onClick}
        className={cx({
          [styles.isBeforeToday]: isBeforeToday,
          [styles.active]: active,
          [styles.isHoliday]: isHoliday,
        })}
      >
        <time dateTime={`${year}년 ${month}월 ${day}일`}>{day}</time>
      </button>
    </li>
  );
};

export default memo(MonthCalendarItem);
