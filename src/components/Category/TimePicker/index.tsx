"use client";

import { MouseEventHandler } from "react";

import cx from "clsx";
import { range } from "lodash-es";

import HorizonDraggable from "@/components/HorizonDraggable";

import CategoryTimePickerItem from "./TimePickerItem";

import styles from "./categoryTimePicker.module.scss";

const checkIsActive = (startIndex: number, endIndex: number, index: number): boolean => {
  const hasClickedStart = startIndex !== -1;
  const hasClickedEnd = endIndex !== -1;

  if (!hasClickedStart && !hasClickedEnd) return false;
  if (hasClickedStart && !hasClickedEnd) return startIndex === index;
  return startIndex <= index && index <= endIndex;
};

interface Props {
  className?: string;
  startAt: number | null;
  endAt: number | null;
  onClickTime: MouseEventHandler<HTMLButtonElement>;
}

const CategoryTimePicker: React.FC<Props> = ({ className, startAt, endAt, onClickTime }) => {
  const time = range(25).map((value) => (value + 9) % 24);
  const startIndex = time.findIndex((value) => value === startAt);
  const endIndex = time.findIndex((value, idx) => value === endAt && idx > startIndex);

  return (
    <HorizonDraggable component="menu" className={cx(styles.wrapper, className)}>
      {range(25).map((value) => {
        return (
          <CategoryTimePickerItem
            key={`${(value + 9) % 24}-${value}`}
            index={value}
            time={(value + 9) % 24}
            onClick={onClickTime}
            isStart={value === startIndex && endIndex > -1}
            isEnd={value === endIndex}
            active={checkIsActive(startIndex, endIndex, value)}
          />
        );
      })}
    </HorizonDraggable>
  );
};

export default CategoryTimePicker;
