"use client";

import type { ComponentProps } from "react";

import styles from "./radio.module.scss";

interface Props extends ComponentProps<"input"> {}

// TODO:
const Radio: React.FC<Props> = ({ children, ...props }) => {
  return (
    <label>
      <input {...props} />
      {children && <span className={styles.children}>{children}</span>}
    </label>
  );
};

export default Radio;
