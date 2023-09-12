"use client";

import type { ChangeEventHandler, ReactNode } from "react";

import cx from "clsx";

import styles from "./toggleItem.module.scss";

interface Props {
  className?: string;
  children: ReactNode;
  checked: boolean;
  onChange: ChangeEventHandler<HTMLInputElement>;
}

const ToggleItem: React.FC<Props> = ({ className, children }) => {
  return (
    <div className={cx(styles.wrapper, className)}>
      <span className={styles.label}>{children}</span>
    </div>
  );
};

export default ToggleItem;
