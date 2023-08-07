"use client";

import { Suspense } from "react";

import { LoadingReservationButton, ReservationButton } from "./_sections";
import { Header } from "../../_shared";
import { Deposit, LoadingSpaceInfo, PriceInfo, Service, SpaceInfo, TimeAndPackage } from "../../_shared/_reservation";

import styles from "./reservationTab.module.scss";

const ReservationTab: React.FC = () => {
  return (
    <main className={styles.wrapper}>
      <Header title="예약" />
      <Suspense fallback={<LoadingSpaceInfo />}>
        <SpaceInfo />
      </Suspense>
      <hr />
      <TimeAndPackage />
      <hr />
      <Service />
      <PriceInfo />
      <Suspense fallback={null}>
        <Deposit />
      </Suspense>
      <Suspense fallback={<LoadingReservationButton />}>
        <ReservationButton />
      </Suspense>
    </main>
  );
};

export default ReservationTab;
