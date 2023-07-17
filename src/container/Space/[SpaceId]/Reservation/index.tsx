import { Suspense } from "react";

import { getSpaceApi, getSpaceIdsApi } from "@/services/space";

import { DataHandler, Header, History, Service, SpaceInfo, TimeAndPackage } from "./_sections";
import ReservationButton from "./_sections/ReservationButton";

import styles from "./spaceReservationContainer.module.scss";

interface Props {
  params: { spaceId: string };
}

export async function generateStaticParams() {
  const { ids } = await getSpaceIdsApi();

  return ids.map((id) => ({
    spaceId: id,
  }));
}

// TODO: spaceInfo => 날짜 변경
export default async function SpaceReservationContainer({ params }: Props) {
  const space = await getSpaceApi(params.spaceId);

  return (
    <>
      <main className={styles.wrapper}>
        <Header />
        <Suspense fallback={null}>
          <SpaceInfo title={space.title} />
        </Suspense>
        <hr />
        <TimeAndPackage />
        <hr />
        {space.additionalServices.length > 0 && (
          <>
            <Service additionalServices={space.additionalServices} />
            <hr />
          </>
        )}
        <History />
        <ReservationButton />
      </main>
      <Suspense fallback={null}>
        <DataHandler />
      </Suspense>
    </>
  );
}
