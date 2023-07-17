"use client";

import { Button } from "@/components";

import styles from "./reservationButton.module.scss";

const ReservationButton: React.FC = () => {
  return (
    <Button type="button" color="primary" disabled className={styles.wrapper}>
      예약하기
    </Button>
  );
};

export default ReservationButton;
