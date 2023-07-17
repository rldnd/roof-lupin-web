"use client";

import type { ComponentProps } from "react";

import cx from "clsx";

import { IconCheck } from "public/icons";

import styles from "./checkbox.module.scss";

interface Props extends Omit<ComponentProps<"input">, "hidden"> {}

const Checkbox: React.FC<Props> = ({ className, children, ...props }) => {
  return (
    <label className={cx(styles.wrapper, className)}>
      <input {...props} type="checkbox" hidden />
      <span className={styles.checkbox}>
        <IconCheck />
      </span>
      {children && <span className={styles.children}>{children}</span>}
    </label>
  );
};

export default Checkbox;
