"use client";

import { useEffect } from "react";

import { useRouter, useSearchParams } from "next/navigation";

import { useSetAtom } from "jotai";

import { Button } from "@/components";
import {
  initialReservation,
  initialReservationTime,
  reservationAdditionalServicesState,
  reservationCouponState,
  reservationDepositConfirmState,
  reservationPackageState,
  reservationState,
  reservationTimeState,
} from "@/states";

import styles from "./tossPayFailContainer.module.scss";

// TODO: server component & client component 분리
const TossPayFailContainer: React.FC = () => {
  const { replace } = useRouter();
  const { get } = useSearchParams();

  const setReservation = useSetAtom(reservationState);
  const setTime = useSetAtom(reservationTimeState);
  const setPackages = useSetAtom(reservationPackageState);
  const setAdditionalServices = useSetAtom(reservationAdditionalServicesState);
  const setDepositConfirm = useSetAtom(reservationDepositConfirmState);
  const setCoupon = useSetAtom(reservationCouponState);

  const onClickButton = () => {
    replace("/");
  };

  useEffect(() => {
    setAdditionalServices({});
    setTime(initialReservationTime);
    setPackages([]);
    setDepositConfirm(false);
    setReservation(initialReservation);
    setCoupon([]);
  }, [setAdditionalServices, setCoupon, setDepositConfirm, setPackages, setReservation, setTime]);

  return (
    <main className={styles.wrapper}>
      <h1>{get("code")}</h1>
      <p>{get("message")}</p>
      <Button type="button" full color="primary" onClick={onClickButton}>
        홈으로 돌아가기
      </Button>
    </main>
  );
};

export default TossPayFailContainer;
