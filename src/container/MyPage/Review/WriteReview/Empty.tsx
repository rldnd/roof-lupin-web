"use client";

import styles from "./empty.module.scss";

const Empty: React.FC = () => {
  return <p className={styles.wrapper}>리뷰를 작성할 수 있는 예약이 없어요.</p>;
};

export default Empty;
