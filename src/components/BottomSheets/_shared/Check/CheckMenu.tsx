"use client";

import type { ReactNode } from "react";

import cx from "clsx";

import styles from "./checkMenu.module.scss";

interface Props {
  className?: string;
  children: ReactNode;
}

const CheckMenu: React.FC<Props> = ({ className, children }) => {
  return <menu className={cx(styles.wrapper, className)}>{children}</menu>;
};

export default CheckMenu;
