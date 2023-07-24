"use client";

import { Suspense } from "react";

import { Discount, Header, ReservationClerkInfo, SelectedReservationInfo, UserInfo } from "../_shared";

import styles from "./requestReservationTab.module.scss";

const RequestReservationTab: React.FC = () => {
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
    </main>
  );
};

export default RequestReservationTab;
