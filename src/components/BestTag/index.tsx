import { memo } from "react";

import styles from "./bestTag.module.scss";

interface Props {
  top?: string;
  left?: string;
  right?: string;
  bottom?: string;
}

const BestTag: React.FC<Props> = ({ top = "auto", right = "auto", bottom = "auto", left = "auto" }) => {
  return (
    <div className={styles.wrapper} style={{ top, right, bottom, left }}>
      <span className={styles.text}>BEST</span>
    </div>
  );
};

export default memo(BestTag);
