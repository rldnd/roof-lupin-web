"use client";

import type { MouseEventHandler } from "react";

import cx from "clsx";
import Skeleton from "react-loading-skeleton";

import type { PossibleTimeCostInfo, TimeCostInfo } from "@/common/types/rentalType";

import styles from "./reservationTimePickerItem.module.scss";

interface Props {
  info: PossibleTimeCostInfo | TimeCostInfo;
  onClick?: MouseEventHandler<HTMLButtonElement>;
  active: boolean;
}

const ReservationTimePickerItem: React.FC<Props> = ({ info, onClick, active }) => {
  const isPossible = "isPossible" in info ? info.isPossible : true;

  return (
    <li className={styles.wrapper}>
      <button
        type="button"
        disabled={!isPossible}
        className={cx(styles.button, { [styles.active]: active })}
        value={info.time}
        onClick={onClick}
      >
        <div className={styles.priceWrapper}>{isPossible && <>{info.cost.toLocaleString("ko-KR")}원</>}</div>
        <time dateTime={`${info.time}:00`}>{info.time % 24}:00</time>
      </button>
    </li>
  );
};

export default ReservationTimePickerItem;

export const LoadingReservationTimePickerItem: React.FC<{ time: number }> = ({ time }) => {
  return (
    <div className={styles.wrapper}>
      <div className={styles.button}>
        <Skeleton width={64} height={44} />
        <time dateTime={`${time}:00`}>{time}:00</time>
      </div>
    </div>
  );
};
