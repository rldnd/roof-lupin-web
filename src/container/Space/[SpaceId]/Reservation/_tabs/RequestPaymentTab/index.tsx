"use client";

import { Suspense } from "react";

import { HostApprove, LoadingSubmit, SubmitButton } from "./_sections";
import { Header } from "../../_shared";
import {
  Discount,
  LoadingDiscount,
  LoadingSelectedReservationInfo,
  PriceInfo,
  ReservationClerkInfo,
  SelectedReservationInfo,
} from "../../_shared/_payment";

import styles from "./requestPaymentTab.module.scss";

const RequestPaymentTab: React.FC = () => {
  return (
    <main className={styles.wrapper}>
      <Header title="예약 요청" />
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
      <HostApprove />
      <hr />
      <Suspense fallback={<LoadingSubmit />}>
        <SubmitButton />
      </Suspense>
    </main>
  );
};

export default RequestPaymentTab;
