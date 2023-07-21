"use client";

import { MouseEventHandler } from "react";

import cx from "clsx";
import { range } from "lodash-es";
import Skeleton from "react-loading-skeleton";

import type { PossibleTimeCostInfo } from "@/common/types/rentalType";
import HorizonDraggable from "@/components/HorizonDraggable";

import ReservationTimePickerItem, { LoadingReservationTimePickerItem } from "./TimePickerItem";

import styles from "./reservationTimePicker.module.scss";

const checkIsActive = (startIndex: number, endIndex: number, index: number): boolean => {
  const hasClickedStart = startIndex !== -1;
  const hasClickedEnd = endIndex !== -1;

  if (!hasClickedStart && !hasClickedEnd) return false;
  if (hasClickedStart && !hasClickedEnd) return startIndex === index;
  return startIndex <= index && index < endIndex;
};

interface Props {
  infos: PossibleTimeCostInfo[];
  className?: string;
  startAt: number | null;
  endAt: number | null;
  onClickTime: MouseEventHandler<HTMLButtonElement>;
}

const ReservationTimePicker: React.FC<Props> = ({ infos, className, startAt, endAt, onClickTime }) => {
  const startIndex = infos.findIndex((info) => info.time === startAt);
  const endIndex = infos.findIndex((info) => info.time === endAt);

  return (
    <HorizonDraggable component="menu" className={cx(styles.wrapper, className)}>
      {infos.map((info, index) => {
        return (
          <ReservationTimePickerItem
            key={info.time}
            info={info}
            onClick={onClickTime}
            active={checkIsActive(startIndex, endIndex, index)}
          />
        );
      })}
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
