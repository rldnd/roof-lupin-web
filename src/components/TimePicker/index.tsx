"use client";

import cx from "clsx";

import type { PossibleTimeCostInfo } from "@/common/types/rentalType";

import { IconLeftChevronSmall } from "public/icons";

import TimePickerItem from "./TimePickerItem";
import HorizonDraggable from "../HorizonDraggable";

import styles from "./timePicker.module.scss";

interface Props {
  infos: PossibleTimeCostInfo[];
  className?: string;
}

const TimePicker: React.FC<Props> = ({ infos, className }) => {
  return (
    <div className={cx(styles.wrapper, className)}>
      <button type="button" className={styles.left}>
        <IconLeftChevronSmall />
      </button>
      <HorizonDraggable component="menu" className={styles.menu}>
        {infos.map((info) => (
          <TimePickerItem key={info.time} info={info} />
        ))}
      </HorizonDraggable>
      <button type="button" className={styles.right}>
        <IconLeftChevronSmall />
      </button>
    </div>
  );
};

export default TimePicker;
