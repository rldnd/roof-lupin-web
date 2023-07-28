import type { ReactNode } from "react";

import styles from "./tagItem.module.scss";

interface Props {
  icon: ReactNode;
  name: string;
}

const TagItem: React.FC<Props> = ({ icon, name }) => {
  return (
    <li className={styles.wrapper}>
      {icon}
      <span className={styles.name}>{name}</span>
    </li>
  );
};

export default TagItem;
