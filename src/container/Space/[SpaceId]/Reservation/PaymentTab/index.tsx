"use client";

import { Suspense } from "react";

import { useSetAtom } from "jotai";

import { reservationTabState } from "@/states/reservation";

import {
  Discount,
  FreeCancelTerm,
  Header,
  PriceInfo,
  ReservationClerkInfo,
  SelectedReservationInfo,
  Submit,
  UserInfo,
} from "../_shared";

import styles from "./paymentTab.module.scss";

const PaymentTab: React.FC = () => {
  const setTab = useSetAtom(reservationTabState);

  return (
    <main className={styles.wrapper}>
      <Header title="결제" onClickBack={() => setTab("reservation")} />
      <Suspense fallback={null}>
        <SelectedReservationInfo />
      </Suspense>
      <hr />
      <ReservationClerkInfo />
      <hr />
      <UserInfo />
      <hr />
      <Discount />
      <hr />
      <PriceInfo />
      <hr />
      <FreeCancelTerm />
      <hr />
      <Submit buttonText="얼마 결제하기" />
    </main>
  );
};

export default PaymentTab;
