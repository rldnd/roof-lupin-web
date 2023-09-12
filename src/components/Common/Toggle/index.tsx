"use client";

import type { ComponentProps } from "react";

import cx from "clsx";

import styles from "./toggle.module.scss";

interface Props extends ComponentProps<"input"> {}

const Toggle: React.FC<Props> = ({ className, checked, ...props }) => {
  return (
    <label className={cx(styles.wrapper, className, { [styles.checked]: checked })}>
      <span className={styles.circle} />
      <input type="checkbox" checked={checked} hidden {...props} />
    </label>
  );
};

export default Toggle;
