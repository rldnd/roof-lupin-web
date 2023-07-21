"use client";

import { useAtomValue } from "jotai";

import { Button } from "@/components";
import { reservationDepositConfirmState, reservationPackageState, reservationTimeState } from "@/states/reservation";

import styles from "./reservationButton.module.scss";

const ReservationButton: React.FC = () => {
  const { startAt: timeStartAt, endAt: timeEndAt } = useAtomValue(reservationTimeState);
  const reservationPackage = useAtomValue(reservationPackageState);
  const reservationDepositConfirm = useAtomValue(reservationDepositConfirmState);

  const enabled = ((timeStartAt && timeEndAt) || reservationPackage.length > 0) && reservationDepositConfirm;

  return (
    <Button type="button" color="primary" disabled={!enabled} className={styles.wrapper}>
      예약하기
    </Button>
  );
};

export default ReservationButton;
