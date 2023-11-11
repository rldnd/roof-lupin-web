"use client";

import styles from "./empty.module.scss";

const Empty: React.FC = () => {
  return <p className={styles.wrapper}>아직 등록된 질문과 답변이 없습니다.</p>;
};

export default Empty;
