"use client";

import { Suspense } from "react";

import { HostApprove } from "./_sections";
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
      <UserInfo />
      <hr />
      <Discount />
      <hr />
      <PriceInfo />
      <hr />
      <FreeCancelTerm />
      <hr />
      <HostApprove />
      <hr />
      <Submit buttonText="지금 예약 요청하기" />
    </main>
  );
};

export default RequestPaymentTab;
