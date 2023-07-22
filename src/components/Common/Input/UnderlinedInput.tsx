"use client";

import type { ComponentProps } from "react";

import cx from "clsx";

import styles from "./underlinedInput.module.scss";

interface Props extends ComponentProps<"input"> {
  wrapperClassName?: string;
  label?: string;
}

const UnderlinedInput: React.FC<Props> = ({ wrapperClassName, className, label, ...props }) => {
  return (
    <label className={cx(styles.wrapper, wrapperClassName)}>
      {label}
      <input className={cx(styles.input, className)} {...props} />
    </label>
  );
};

export default UnderlinedInput;
