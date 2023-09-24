"use client";

import styles from "./empty.module.scss";

const Empty: React.FC = () => {
  return (
    <div className={styles.wrapper}>
      <img src="/images/interest/interest-empty.png" alt="찜 엠티 이미지" className={styles.image} />
      <p className={styles.text}>아직 찜한 루프가 없어요</p>
      <small className={styles.desc}>관심있는 공간을 찜해 보세요!</small>
    </div>
  );
};

export default Empty;
