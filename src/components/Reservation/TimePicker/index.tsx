"use client";

import cx from "clsx";
import { range } from "lodash-es";
import Skeleton from "react-loading-skeleton";

import type { PossibleTimeCostInfo } from "@/common/types/rentalType";
import HorizonDraggable from "@/components/HorizonDraggable";

import ReservationTimePickerItem, { LoadingReservationTimePickerItem } from "./TimePickerItem";

import styles from "./reservationTimePicker.module.scss";

interface Props {
  infos: PossibleTimeCostInfo[];
  className?: string;
}

const ReservationTimePicker: React.FC<Props> = ({ infos, className }) => {
  return (
    <HorizonDraggable component="menu" className={cx(styles.wrapper, className)}>
      {infos.map((info) => (
        <ReservationTimePickerItem key={info.time} info={info} />
      ))}
    </HorizonDraggable>
  );
};

export default ReservationTimePicker;

export const LoadingReservationTimePicker: React.FC<{ className?: string }> = ({ className }) => {
  return (
    <HorizonDraggable component="div" className={cx(styles.wrapper, className)}>
      {range(24).map((value) => (
        <LoadingReservationTimePickerItem key={value} time={(value + 9) % 24} />
      ))}
      <Skeleton />
    </HorizonDraggable>
  );
};
