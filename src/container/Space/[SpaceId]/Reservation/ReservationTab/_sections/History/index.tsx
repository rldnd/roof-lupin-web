"use client";

import { PriceInfoTable } from "@/components";

import styles from "./history.module.scss";

const items = [
  {
    title: "인원 추가 금액",
    price: 2000,
  },
  {
    title: "인원 추가 금액2",
    price: 5000,
  },
  {
    title: "인원 추가 금액3",
    price: 10000,
  },
];

const History: React.FC = () => {
  return (
    <section className={styles.wrapper}>
      <h2>예약 내역</h2>
      <span className={styles.description}>쿠폰 등 혜택이 적용되지 않은 금액이에요.</span>
      <div className={styles.remainNotice}>선택한 내용은 이전 화면으로 돌아가도 20분간 유지됩니다.</div>
      <PriceInfoTable items={items} totalTitle="총 예상 결제 금액" />
    </section>
  );
};

export default History;
