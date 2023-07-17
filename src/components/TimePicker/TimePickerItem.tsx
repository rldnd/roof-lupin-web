"use client";

import Skeleton from "react-loading-skeleton";

import type { PossibleTimeCostInfo } from "@/common/types/rentalType";

import styles from "./timePickerItem.module.scss";

interface Props {
  info: PossibleTimeCostInfo;
}

const TimePickerItem: React.FC<Props> = ({ info }) => {
  return (
    <li className={styles.wrapper}>
      <button type="button" disabled={!info.isPossible} className={styles.button}>
        <div className={styles.priceWrapper}>{info.isPossible && <>{info.cost}원</>}</div>
        <time dateTime={`${info.time}:00`}>{info.time}:00</time>
      </button>
    </li>
  );
};

export default TimePickerItem;

export const LoadingTimePickerItem: React.FC<{ time: number }> = ({ time }) => {
  return (
    <div className={styles.wrapper}>
      <div className={styles.button}>
        <Skeleton width={64} height={44} />
        <time dateTime={`${time}:00`}>{time}:00</time>
      </div>
    </div>
  );
};
