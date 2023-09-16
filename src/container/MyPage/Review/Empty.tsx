"use client";

import styles from "./empty.module.scss";

const Empty: React.FC = () => {
  return <p className={styles.wrapper}>아직 작성한 후기가 없어요.</p>;
};

export default Empty;
