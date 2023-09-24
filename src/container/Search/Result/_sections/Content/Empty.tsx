"use client";

import styles from "./empty.module.scss";

interface Props {
  keyword: string;
}

const Empty: React.FC<Props> = ({ keyword }) => {
  return (
    <div className={styles.wrapper}>
      <img src="/images/search/search-empty.png" className={styles.image} alt="검색 엠티 이미지" />
      <h2 className={styles.title}>
        <strong>&apos;{keyword}&apos;</strong>으로 검색한 결과,
        <br />
        해당하는 공간이 없어요
      </h2>
      <small className={styles.desc}>검색어를 바꿔보세요!</small>
    </div>
  );
};

export default Empty;
