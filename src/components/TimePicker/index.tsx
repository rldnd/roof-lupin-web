"use client";

import cx from "clsx";
import { range } from "lodash-es";
import Skeleton from "react-loading-skeleton";

import type { PossibleTimeCostInfo } from "@/common/types/rentalType";

import TimePickerItem, { LoadingTimePickerItem } from "./TimePickerItem";
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

export const LoadingTimePicker: React.FC<{ className?: string }> = ({ className }) => {
  return (
    <HorizonDraggable component="div" className={cx(styles.wrapper, className)}>
      {range(24).map((value) => (
        <LoadingTimePickerItem key={value} time={(value + 9) % 24} />
      ))}
      <Skeleton />
    </HorizonDraggable>
  );
};
