"use client";

import Skeleton from "react-loading-skeleton";

import styles from "./freeCancelTerm.module.scss";

const FreeCancelTerm: React.FC = () => {
  return (
    <section className={styles.wrapper}>
      <h2>환불 규정</h2>
      <p>2023년 9월 12일까지 수수료 없이 취소가 가능합니다. 9월 13일 이후로는 부분 환불이 가능합니다.</p>
      <button type="button">취소 및 환불 규정</button>
    </section>
  );
};

export default FreeCancelTerm;

export const LoadingFreeCancelTerm: React.FC = () => {
  return (
    <section className={styles.wrapper}>
      <h2>환불 규정</h2>
      <Skeleton width={150} />
      <Skeleton width={60} />
    </section>
  );
};
