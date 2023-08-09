"use client";

import HorizonDraggable from "@/components/HorizonDraggable";

import styles from "./paymentCategory.module.scss";

const PaymentCategory: React.FC = () => {
  return (
    <section className={styles.wrapper}>
      <h2>결제 유형</h2>
      <HorizonDraggable component="menu">
        <li></li>
      </HorizonDraggable>
    </section>
  );
};

export default PaymentCategory;
