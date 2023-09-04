import { Suspense } from "react";

import Header from "./Header";
import TabBar from "./TabBar";

import styles from "./myQnaContainer.module.scss";

export default async function MyQnaContainer() {
  return (
    <div className={styles.wrapper}>
      <Header />
      <Suspense fallback={null}>
        <TabBar />
      </Suspense>
      <main></main>
    </div>
  );
}
