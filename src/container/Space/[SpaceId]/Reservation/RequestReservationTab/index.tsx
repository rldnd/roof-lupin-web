import { Suspense } from "react";

import { HostApprove } from "./_sections";
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

import styles from "./requestReservationTab.module.scss";

// TODO: spaceInfo => 날짜 변경
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
      <Suspense fallback={<LoadingReservationButton />}>
        <ReservationButton />
      </Suspense>
    </main>
  );
};

export default RequestReservationTab;
