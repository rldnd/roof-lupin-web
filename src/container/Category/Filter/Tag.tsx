"use client";

import type { ReactNode } from "react";

import styles from "./tag.module.scss";

interface Props {
  children: ReactNode;
}

const Tag: React.FC<Props> = ({ children }) => {
  return <li className={styles.wrapper}>{children}</li>;
};

export default Tag;
