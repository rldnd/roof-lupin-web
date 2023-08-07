"use client";

import type { ReactNode } from "react";

import { Checkbox } from "@/components/Common";

import styles from "./checkMenuItem.module.scss";

interface Props {
  children: ReactNode;
}

const CheckMenuItem: React.FC<Props> = ({ children }) => {
  return (
    <li className={styles.wrapper}>
      <button type="button" className={styles.button}>
        <Checkbox className={styles.checkbox}>{children}</Checkbox>
      </button>
    </li>
  );
};

export default CheckMenuItem;
