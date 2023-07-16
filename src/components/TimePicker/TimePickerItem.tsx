"use client";

import cx from "clsx";

import type { PossibleTimeCostInfo } from "@/common/types/rentalType";

import styles from "./timePickerItem.module.scss";

interface Props {
  info: PossibleTimeCostInfo;
}

const TimePickerItem: React.FC<Props> = ({ info }) => {
  return (
    <li className={styles.wrapper}>
      <button type="button" disabled={!info.isPossible}>
        <div className={styles.priceWrapper}>{info.isPossible && <>{info.cost}원</>}</div>
        <time dateTime={`${info.time}:00`}>{info.time}:00</time>
      </button>
    </li>
  );
};

export default TimePickerItem;
