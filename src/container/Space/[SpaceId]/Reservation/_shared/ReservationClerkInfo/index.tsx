"use client";

import { UnderlinedInput } from "@/components";

import styles from "./reservationClerkInfo.module.scss";

const ReservationClerkInfo: React.FC = () => {
  return (
    <section className={styles.wrapper}>
      <h2>예약자 정보</h2>
      <UnderlinedInput label="성명" className={styles.input} />
      <UnderlinedInput label="전화번호" className={styles.input} />
    </section>
  );
};

export default ReservationClerkInfo;
