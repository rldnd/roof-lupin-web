"use client";

import type { MouseEventHandler, ReactNode } from "react";

import cx from "clsx";

import styles from "./buttonItem.module.scss";

interface Props {
  className?: string;
  children: ReactNode;
  onClick: MouseEventHandler<HTMLButtonElement>;
}

const ButtonItem: React.FC<Props> = ({ className, children, onClick }) => {
  return (
    <button className={cx(styles.wrapper, className)} onClick={onClick}>
      {children}
    </button>
  );
};

export default ButtonItem;
