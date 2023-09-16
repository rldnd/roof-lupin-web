"use client";

import styles from "./empty.module.scss";

const Empty: React.FC = () => {
  return (
    <div className={styles.wrapper}>
      <img src="/images/search/search-empty.png" className={styles.searchEmptyImage} alt="결과 없음 이미지" />
      <h2 className={styles.title}>일치하는 결과가 없어요</h2>
      <span className={styles.description}>검색 범위를 바꿔보세요!</span>
    </div>
  );
};

export default Empty;
