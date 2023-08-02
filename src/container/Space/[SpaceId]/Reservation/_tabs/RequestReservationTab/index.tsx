"use client";

import { Suspense } from "react";

import { HostApprove, LoadingRequestReservationButton, RequestReservationButton } from "./_sections";
import { Header } from "../../_shared";
import { Deposit, History, LoadingSpaceInfo, Service, SpaceInfo, TimeAndPackage } from "../../_shared/_reservation";

import styles from "./requestReservationTab.module.scss";

const RequestReservationTab: React.FC = () => {
  return (
    <main className={styles.wrapper}>
      <Header title="예약 요청" />
      <HostApprove />
      <Suspense fallback={<LoadingSpaceInfo />}>
        <SpaceInfo />
      </Suspense>
      <hr />
      <TimeAndPackage />
      <hr />
      <Service />
      <History />
      <Suspense fallback={null}>
        <Deposit />
      </Suspense>
      <Suspense fallback={<LoadingRequestReservationButton />}>
        <RequestReservationButton />
      </Suspense>
    </main>
  );
};

export default RequestReservationTab;
