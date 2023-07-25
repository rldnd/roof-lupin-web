"use client";

import styles from "./dayBar.module.scss";

const DayBar: React.FC = () => {
  return (
    <ul className={styles.wrapper}>
      <li>일</li>
      <li>월</li>
      <li>화</li>
      <li>수</li>
      <li>목</li>
      <li>금</li>
      <li>토</li>
    </ul>
  );
};

export default DayBar;
