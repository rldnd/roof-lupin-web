"use client";

import cx from "clsx";

import type { PossibleTimeCostInfo } from "@/common/types/rentalType";

import TimePickerItem from "./TimePickerItem";
import HorizonDraggable from "../HorizonDraggable";

import styles from "./timePicker.module.scss";

interface Props {
  infos: PossibleTimeCostInfo[];
  className?: string;
}

const TimePicker: React.FC<Props> = ({ infos, className }) => {
  return (
    <HorizonDraggable component="menu" className={cx(styles.wrapper, className)}>
      {infos.map((info) => (
        <TimePickerItem key={info.time} info={info} />
      ))}
    </HorizonDraggable>
  );
};

export default TimePicker;
