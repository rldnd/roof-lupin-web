"use client";

import type { MouseEventHandler } from "react";

import cx from "clsx";

import styles from "./categoryTimePickerItem.module.scss";

interface Props {
  index: number;
  time: number;
  onClick: MouseEventHandler<HTMLButtonElement>;
  active: boolean;
}

const CategoryTimePickerItem: React.FC<Props> = ({ onClick, active, index, time }) => {
  return (
    <li className={styles.wrapper}>
      <button type="button" className={cx(styles.button, { [styles.active]: active })} value={index} onClick={onClick}>
        <div className={styles.priceWrapper}>{time}</div>
      </button>
    </li>
  );
};

export default CategoryTimePickerItem;
