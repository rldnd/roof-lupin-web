import type { ReactNode } from "react";

import cx from "clsx";

import styles from "./tag.module.scss";

export type Color = "primary" | "bw" | "secondary";
export type Size = "big" | "small";

interface Props {
  className?: string;
  color: Color;
  size: Size;
  children: ReactNode;
}

const Tag: React.FC<Props> = ({ children, className, color, size }) => {
  return <span className={cx(styles.wrapper, styles[color], styles[size], className)}>{children}</span>;
};

export default Tag;
