"use client";

import { IconGrayRightChevronLarge } from "public/icons";

import styles from "./discount.module.scss";

const Discount: React.FC = () => {
  return (
    <section className={styles.wrapper}>
      <h2>할인</h2>
      <button type="button" className={styles.couponButton}>
        <span>
          쿠폰 할인<span className={styles.currentCoupons}>(전체 1장, 적용가능 1장)</span>
        </span>
        <IconGrayRightChevronLarge />
      </button>
    </section>
  );
};

export default Discount;
