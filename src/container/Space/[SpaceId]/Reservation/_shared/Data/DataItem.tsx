"use client";

import type { ReactNode } from "react";

import cx from "clsx";

import styles from "./dataItem.module.scss";

interface Props {
  label: string;
  children: ReactNode;
  dtClassName?: string;
  ddClassName?: string;
}

const DataItem: React.FC<Props> = ({ children, label, ddClassName, dtClassName }) => {
  return (
    <>
      <dt className={cx(styles.dt, dtClassName)}>{label}</dt>
      <dd className={cx(styles.dd, ddClassName)}>{children}</dd>
    </>
  );
};

export default DataItem;
