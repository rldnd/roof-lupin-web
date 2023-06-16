import type { ReactNode } from "react";

import cx from "clsx";

import styles from "./tag.module.scss";

type Size = "big" | "small";
type Type = "bw" | "color" | "outlined";

interface Props {
  className?: string;
  children: ReactNode;
  size: Size;
  type: Type;
}

const Tag: React.FC<Props> = ({ children, size, type, className }) => {
  return <span className={cx(styles.wrapper, className, styles[size], styles[type])}>{children}</span>;
};

export default Tag;
