import dynamic from "next/dynamic";

import Header from "./Header";
import { LoadingList } from "./List";
import TabBar from "./TabBar";

import styles from "./myReservationContainer.module.scss";

const List = dynamic(() => import("./List"), { ssr: false, loading: () => <LoadingList /> });

// TODO: empty view
export default async function MyReservationContainer() {
  return (
    <div className={styles.wrapper}>
      <Header />
      <TabBar />
      <main>
        <List />
      </main>
    </div>
  );
}
