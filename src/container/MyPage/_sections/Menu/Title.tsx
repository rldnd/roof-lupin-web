import type { ReactNode } from "react";

import cx from "clsx";

import styles from "./title.module.scss";

interface Props {
  className?: string;
  children: ReactNode;
}

const Title: React.FC<Props> = ({ children, className }) => {
  return <h2 className={cx(styles.wrapper, className)}>{children}</h2>;
};

export default Title;
