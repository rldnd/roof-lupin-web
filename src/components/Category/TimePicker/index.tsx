"use client";

import { MouseEventHandler } from "react";

import cx from "clsx";
import { range } from "lodash-es";

import HorizonDraggable from "@/components/HorizonDraggable";

import CategoryTimePickerItem from "./TimePickerItem";

import styles from "./categoryTimePicker.module.scss";

const checkIsActive = (startAt: number | null, endAt: number | null, hour: number): boolean => {
  const hasClickedStart = startAt !== null;
  const hasClickedEnd = endAt !== null;

  if (!hasClickedStart && !hasClickedEnd) return false;
  if (hasClickedStart && !hasClickedEnd) return startAt === hour;
  return startAt! <= hour && hour <= endAt!;
};

interface Props {
  className?: string;
  startAt: number | null;
  endAt: number | null;
  onClickTime: MouseEventHandler<HTMLButtonElement>;
}

const CategoryTimePicker: React.FC<Props> = ({ className, startAt, endAt, onClickTime }) => {
  return (
    <HorizonDraggable component="menu" className={cx(styles.wrapper, className)}>
      {range(9, 33).map((value) => {
        return (
          <CategoryTimePickerItem
            key={value}
            index={value}
            time={value}
            onClick={onClickTime}
            isStart={value === startAt && endAt !== null}
            isEnd={value === endAt}
            active={checkIsActive(startAt, endAt, value)}
          />
        );
      })}
    </HorizonDraggable>
  );
};

export default CategoryTimePicker;
