"use client";

import type { ComponentProps } from "react";

import cx from "clsx";

import styles from "./textarea.module.scss";

interface Props extends ComponentProps<"textarea"> {}

const Textarea: React.FC<Props> = ({ className, ...props }) => {
  return <textarea className={cx(styles.wrapper, className)} {...props} />;
};

export default Textarea;
