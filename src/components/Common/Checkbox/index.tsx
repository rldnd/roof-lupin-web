"use client";

import type { ComponentProps } from "react";

import cx from "clsx";

import { IconCheck } from "public/icons";

import styles from "./checkbox.module.scss";

interface Props extends ComponentProps<"input"> {}

const Checkbox: React.FC<Props> = ({ className, ...props }) => {
  return (
    <label className={cx(styles.wrapper, className)}>
      <input {...props} type="checkbox" hidden />
      <IconCheck />
    </label>
  );
};

export default Checkbox;
