"use client";

import type { ComponentProps } from "react";

import styles from "./radio.module.scss";

interface Props extends ComponentProps<"input"> {}

const Radio: React.FC<Props> = ({ children, ...props }) => {
  return (
    <label className={styles.wrapper}>
      <div className={styles.inputWrapper}>
        <input type="radio" {...props} />
      </div>
      {children && <span className={styles.children}>{children}</span>}
    </label>
  );
};

export default Radio;
