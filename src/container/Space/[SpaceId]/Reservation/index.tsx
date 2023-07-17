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
        <Suspense fallback={null}>
          <TimeAndPackage />
        </Suspense>
        <hr />
        <Suspense fallback={null}>
          <Service />
        </Suspense>
        <hr />
        <History />
        <ReservationButton />
      </main>
      <Suspense fallback={null}>
        <DataHandler />
      </Suspense>
    </>
  );
}
