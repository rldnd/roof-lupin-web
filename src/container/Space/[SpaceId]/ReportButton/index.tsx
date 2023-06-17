"use client";

import styles from "./reportButton.module.scss";

const ReportButton: React.FC = () => {
  return (
    <button type="button" className={styles.wrapper}>
      신고하기
    </button>
  );
};

export default ReportButton;
