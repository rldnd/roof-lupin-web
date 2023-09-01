"use client";

import { Suspense } from "react";

import { LoadingSubmit, SubmitButton } from "./_sections";
import { Header } from "../../_shared";
import {
  Agreement,
  Discount,
  FreeCancelTerm,
  LoadingDiscount,
  LoadingFreeCancelTerm,
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
      <Suspense fallback={<LoadingDiscount />}>
        <Discount />
      </Suspense>
      <hr />
      <PriceInfo />
      <hr />
      <Suspense fallback={null}>
        <PaymentMethod />
      </Suspense>
      <hr />
      <Suspense fallback={<LoadingFreeCancelTerm />}>
        <FreeCancelTerm />
      </Suspense>
      <hr />
      <Agreement />
      <Suspense fallback={<LoadingSubmit />}>
        <SubmitButton />
      </Suspense>
    </main>
  );
};

export default PaymentTab;
