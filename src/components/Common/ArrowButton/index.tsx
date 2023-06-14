"use client";

import type { ComponentProps } from "react";

import cx from "clsx";

import { IconGrayRightChevron, IconOrangeDownChevron, IconOrangeRightChevron } from "public/icons";

import styles from "./arrowButton.module.scss";

interface Props extends ComponentProps<"button"> {
  direction: "right" | "down";
  color: "primary" | "secondary";
  isBold?: boolean;
}

const ArrowButton: React.FC<Props> = ({ className, children, color, direction, isBold = false, ...props }) => {
  return (
    <button className={cx(styles.wrapper, styles[color], className, { [styles.isBold]: isBold })} {...props}>
      {children}
      {direction === "right" && color === "primary" && <IconOrangeRightChevron />}
      {direction === "down" && color === "primary" && <IconOrangeDownChevron />}
      {direction === "right" && color === "secondary" && <IconGrayRightChevron />}
    </button>
  );
};

export default ArrowButton;
