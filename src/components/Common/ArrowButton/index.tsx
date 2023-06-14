"use client";

import type { ComponentProps } from "react";

import cx from "clsx";

import styles from "./arrowButton.module.scss";

interface Props extends ComponentProps<"button"> {}

const ArrowButton: React.FC<Props> = ({ className, ...props }) => {
  return <button className={cx(styles.wrapper, className)} {...props} />;
};

export default ArrowButton;
