"use client";

import type { ReactNode } from "react";

import cx from "clsx";

import styles from "./dataList.module.scss";

interface Props {
  children: ReactNode;
  className?: string;
}

const DataList: React.FC<Props> = ({ children, className }) => {
  return <dl className={cx(styles.wrapper, className)}>{children}</dl>;
};

export default DataList;
