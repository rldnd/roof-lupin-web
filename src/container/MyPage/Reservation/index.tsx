import { Suspense } from "react";

import dynamic from "next/dynamic";

import { BaseCenterHeader } from "@/components/Layout";

import { LoadingList } from "./List";
import TabBar from "./TabBar";

import styles from "./myReservationContainer.module.scss";

const List = dynamic(() => import("./List"), { ssr: false, loading: () => <LoadingList /> });

// TODO: empty view
export default async function MyReservationContainer() {
  return (
    <div className={styles.wrapper}>
      <BaseCenterHeader title="예약 내역" href="/my-page" />
      <Suspense fallback={null}>
        <TabBar />
      </Suspense>
      <main>
        <List />
      </main>
    </div>
  );
}
