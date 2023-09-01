import { Suspense } from "react";

import { TOAST_BOTTOM_WITHOUT_BOTTOM_NAVIGATION } from "@/common/constants";
import { ToastPositioner } from "@/components";

import Header from "./Header";
import List, { LoadingList } from "./List";

import styles from "./announcementContainer.module.scss";

export default async function AnnouncementContainer() {
  return (
    <ToastPositioner position={TOAST_BOTTOM_WITHOUT_BOTTOM_NAVIGATION}>
      <div className={styles.wrapper}>
        <Header />
        <main>
          <Suspense fallback={<LoadingList />}>
            <List />
          </Suspense>
        </main>
      </div>
    </ToastPositioner>
  );
}
