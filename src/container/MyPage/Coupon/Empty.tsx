"use client";

import styles from "./empty.module.scss";

const Empty: React.FC = () => {
  return <p className={styles.wrapper}>현재 사용 가능한 쿠폰이 없어요.</p>;
};

export default Empty;
