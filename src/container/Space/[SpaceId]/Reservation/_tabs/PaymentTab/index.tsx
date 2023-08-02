"use client";

import { Suspense } from "react";

import { LoadingSubmit, SubmitButton } from "./_sections";
import { Header } from "../../_shared";
import {
  Checkboxes,
  Discount,
  FreeCancelTerm,
  LoadingSelectedReservationInfo,
  PaymentMethod,
  PriceInfo,
  ReservationClerkInfo,
  SelectedReservationInfo,
} from "../../_shared/_payment";

import styles from "./paymentTab.module.scss";

const PaymentTab: React.FC = () => {
  return (
    <main className={styles.wrapper}>
      <Header title="결제" />
      <Suspense fallback={<LoadingSelectedReservationInfo />}>
        <SelectedReservationInfo />
      </Suspense>
      <hr />
      <ReservationClerkInfo />
      <hr />
      <Discount />
      <hr />
      <PriceInfo />
      <hr />
      <PaymentMethod />
      <hr />
      <FreeCancelTerm />
      <hr />
      <Checkboxes />
      <Suspense fallback={<LoadingSubmit />}>
        <SubmitButton />
      </Suspense>
    </main>
  );
};

export default PaymentTab;
