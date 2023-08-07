"use client";

import type { MouseEventHandler } from "react";

import cx from "clsx";

import styles from "./categoryTimePickerItem.module.scss";

interface Props {
  index: number;
  time: number;
  onClick: MouseEventHandler<HTMLButtonElement>;
  active: boolean;
  isStart: boolean;
  isEnd: boolean;
}

const CategoryTimePickerItem: React.FC<Props> = ({ onClick, active, index, time, isStart, isEnd }) => {
  return (
    <li className={styles.wrapper}>
      <button
        type="button"
        className={cx(styles.button, { [styles.active]: active, [styles.isStart]: isStart, [styles.isEnd]: isEnd })}
        value={index}
        onClick={onClick}
      >
        {`${time}:00`}
      </button>
    </li>
  );
};

export default CategoryTimePickerItem;
