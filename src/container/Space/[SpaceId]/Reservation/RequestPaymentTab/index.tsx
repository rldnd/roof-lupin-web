"use client";

import { Suspense } from "react";

import { HostApprove, SubmitButton } from "./_sections";
import { Header } from "../_shared";
import {
  Checkboxes,
  Discount,
  FreeCancelTerm,
  PriceInfo,
  ReservationClerkInfo,
  SelectedReservationInfo,
} from "../_shared/_payment";

import styles from "./requestPaymentTab.module.scss";

const RequestPaymentTab: React.FC = () => {
  return (
    <main className={styles.wrapper}>
      <Header title="예약 요청" />
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
      <HostApprove />
      <hr />
      <Checkboxes />
      <SubmitButton />
    </main>
  );
};

export default RequestPaymentTab;
