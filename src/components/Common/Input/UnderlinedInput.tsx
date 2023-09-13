"use client";

import type { ComponentProps } from "react";

import cx from "clsx";

import styles from "./underlinedInput.module.scss";

interface Props extends ComponentProps<"input"> {
  errorMessage?: string;
  wrapperClassName?: string;
  label?: string;
}

const UnderlinedInput: React.FC<Props> = ({ wrapperClassName, className, label, errorMessage, ...props }) => {
  return (
    <>
      <label className={cx(styles.wrapper, wrapperClassName)}>
        {label}
        <input className={cx(styles.input, className)} {...props} />
        {errorMessage && <span className={styles.errorMessage}>{errorMessage}</span>}
      </label>
    </>
  );
};

export default UnderlinedInput;
