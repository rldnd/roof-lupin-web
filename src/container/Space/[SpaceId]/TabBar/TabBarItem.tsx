"use client";

import { memo, type MouseEventHandler, type ReactNode } from "react";

import cx from "clsx";

import type { DataSection } from "./TabBar";

import styles from "./tabBarItem.module.scss";

interface Props {
  sectionName: DataSection;
  currentPosition: DataSection | "";
  onClickItem: MouseEventHandler<HTMLButtonElement>;
  children: ReactNode;
}

const TabBarItem: React.FC<Props> = ({ sectionName, currentPosition, onClickItem, children }) => {
  return (
    <button
      type="button"
      className={cx(styles.wrapper, { [styles.active]: currentPosition === sectionName })}
      data-section={sectionName}
      onClick={onClickItem}
    >
      {children}
    </button>
  );
};

export default memo(TabBarItem);
