import { Suspense } from "react";

import Header from "./Header";
import List, { LoadingList } from "./List";

import styles from "./announcementContainer.module.scss";

export default async function AnnouncementContainer() {
  return (
    <div className={styles.wrapper}>
      <Header />
      <main>
        <Suspense fallback={<LoadingList />}>
          <List />
        </Suspense>
      </main>
    </div>
  );
}
