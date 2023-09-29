"use client";

import styles from "./empty.module.scss";

const Empty: React.FC = () => {
  return <p className={styles.wrapper}>아직 등록된 질문이 없어요</p>;
};

export default Empty;
