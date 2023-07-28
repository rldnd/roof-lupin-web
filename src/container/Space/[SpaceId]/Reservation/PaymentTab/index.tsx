"use client";

import { Suspense } from "react";

import { Header } from "../_shared";
import {
  Discount,
  FreeCancelTerm,
  PriceInfo,
  ReservationClerkInfo,
  SelectedReservationInfo,
  Submit,
  UserInfo,
} from "../_shared/_payment";

import styles from "./paymentTab.module.scss";

const PaymentTab: React.FC = () => {
  return (
    <main className={styles.wrapper}>
      <Header title="결제" />
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
