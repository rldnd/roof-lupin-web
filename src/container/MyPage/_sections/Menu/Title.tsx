import type { ReactNode } from "react";

import styles from "./title.module.scss";

interface Props {
  children: ReactNode;
}

const Title: React.FC<Props> = ({ children }) => {
  return <h2 className={styles.wrapper}>{children}</h2>;
};

export default Title;
