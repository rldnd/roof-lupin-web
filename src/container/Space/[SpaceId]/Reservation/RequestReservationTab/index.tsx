"use client";

import { Suspense } from "react";

import { Header, ReservationClerkInfo, SelectedReservationInfo } from "../_shared";

import styles from "./requestReservationTab.module.scss";

const RequestReservationTab: React.FC = () => {
  return (
    <main className={styles.wrapper}>
      <Header title="예약 요청" />
      <Suspense fallback={<></>}>
        <SelectedReservationInfo />
      </Suspense>
      <hr />
      <ReservationClerkInfo />
      <hr />

      <hr />
    </main>
  );
};

export default RequestReservationTab;
