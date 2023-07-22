import type { ReactNode } from "react";

import cx from "clsx";

import styles from "./tag.module.scss";

interface Props {
  className?: string;
  children: ReactNode;
}

const Tag: React.FC<Props> = ({ children, className }) => {
  return <span className={cx(styles.wrapper, className)}>{children}</span>;
};

export default Tag;
