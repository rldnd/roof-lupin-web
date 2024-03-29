"use client";

import { MouseEventHandler } from "react";

import cx from "clsx";
import { range } from "lodash-es";
import Skeleton from "react-loading-skeleton";

import type { PossibleTimeCostInfo, TimeCostInfo } from "@/common/types/rentalType";
import HorizonDraggable from "@/components/HorizonDraggable";

import ReservationTimePickerItem, { LoadingReservationTimePickerItem } from "./TimePickerItem";

import styles from "./reservationTimePicker.module.scss";

const checkIsActive = (startAt: number | null, endAt: number | null, hour: number): boolean => {
  const hasClickedStart = startAt !== null;
  const hasClickedEnd = endAt !== null;

  if (!hasClickedStart && !hasClickedEnd) return false;
  if (hasClickedStart && !hasClickedEnd) return startAt === hour;
  return startAt! <= hour && hour <= endAt!;
};

interface Props {
  infos: Array<PossibleTimeCostInfo | TimeCostInfo>;
  className?: string;
  startAt: number | null;
  endAt: number | null;
  onClickTime?: MouseEventHandler<HTMLButtonElement>;
}

const ReservationTimePicker: React.FC<Props> = ({ infos, className, startAt, endAt, onClickTime }) => {
  return (
    <HorizonDraggable component="menu" className={cx(styles.wrapper, className)}>
      {infos.map((info, index) => {
        return (
          <ReservationTimePickerItem
            key={`${info.time}-${index}`}
            info={info}
            onClick={onClickTime}
            active={checkIsActive(startAt, endAt, info.time)}
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
        <LoadingReservationTimePickerItem key={`${(value + 9) % 24}-${value}`} time={(value + 9) % 24} />
      ))}
      <Skeleton />
    </HorizonDraggable>
  );
};
