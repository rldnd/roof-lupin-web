import { Suspense } from "react";

import { DataHandler, Deposit, History, LoadingSpaceInfo, Service, SpaceInfo, TimeAndPackage } from "./_sections";
import ReservationButton, { LoadingReservationButton } from "./_sections/ReservationButton";
import { Header } from "../_shared";

import styles from "./reservationTab.module.scss";

// TODO: spaceInfo => 날짜 변경
const ReservationTab: React.FC = () => {
  return (
    <>
      <main className={styles.wrapper}>
        <Header title="예약" />
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
        <Suspense fallback>
          <ReservationButton />
        </Suspense>
      </main>
      <Suspense fallback={<LoadingReservationButton />}>
        <DataHandler />
      </Suspense>
    </>
  );
};

export default ReservationTab;
