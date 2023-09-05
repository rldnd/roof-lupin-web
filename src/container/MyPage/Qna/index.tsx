import { Suspense } from "react";

import dynamic from "next/dynamic";

import Header from "./Header";
import { LoadingList } from "./List";
import TabBar from "./TabBar";

import styles from "./myQnaContainer.module.scss";

const List = dynamic(() => import("./List"), { ssr: false, loading: () => <LoadingList /> });

export default async function MyQnaContainer() {
  return (
    <div className={styles.wrapper}>
      <Header />
      <Suspense fallback={null}>
        <TabBar />
      </Suspense>
      <main>
        <List />
      </main>
    </div>
  );
}
