import dynamic from "next/dynamic";

import Header from "./Header";
import { LoadingTabBar } from "./TabBar";

import styles from "./myReviewContainer.module.scss";

const TabBar = dynamic(() => import("./TabBar"), { ssr: false, loading: () => <LoadingTabBar /> });

export default async function MyReviewContainer() {
  return (
    <div className={styles.wrapper}>
      <Header />
      <TabBar />
      <main></main>
    </div>
  );
}
