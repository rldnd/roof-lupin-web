import { Suspense } from "react";

import { Header } from "../_shared";
import {
  Deposit,
  History,
  LoadingReservationButton,
  LoadingSpaceInfo,
  ReservationButton,
  Service,
  SpaceInfo,
  TimeAndPackage,
} from "../_shared/_reservation";

import styles from "./reservationTab.module.scss";

// TODO: spaceInfo => 날짜 변경
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
      <History />
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
