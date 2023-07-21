import { Suspense } from "react";

import { DataHandler, Header, History, LoadingSpaceInfo, Service, SpaceInfo, TimeAndPackage } from "./_sections";
import ReservationButton from "./_sections/ReservationButton";

import styles from "./reservationTab.module.scss";

// TODO: spaceInfo => 날짜 변경
const ReservationTab: React.FC = () => {
  return (
    <>
      <main className={styles.wrapper}>
        <Header />
        <Suspense fallback={<LoadingSpaceInfo />}>
          <SpaceInfo />
        </Suspense>
        <hr />
        <TimeAndPackage />
        <hr />
        {/* {space.additionalServices.length > 0 && (
          <>
            <Service />
            <hr />
          </>
        )} */}
        <History />
        <ReservationButton />
      </main>
      <Suspense fallback={null}>
        <DataHandler />
      </Suspense>
    </>
  );
};

export default ReservationTab;
