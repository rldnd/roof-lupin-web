"use client";

import { Suspense } from "react";

import { SubmitButton } from "./_sections";
import { Header } from "../_shared";
import {
  Checkboxes,
  Discount,
  FreeCancelTerm,
  PriceInfo,
  ReservationClerkInfo,
  SelectedReservationInfo,
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
      <Discount />
      <hr />
      <PriceInfo />
      <hr />
      <FreeCancelTerm />
      <hr />
      <Checkboxes />
      <SubmitButton />
    </main>
  );
};

export default PaymentTab;
