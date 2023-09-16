import { Suspense } from "react";

import { TOAST_BOTTOM_WITHOUT_BOTTOM_NAVIGATION } from "@/common/constants";
import { ToastPositioner } from "@/components";
import { BaseCenterHeader } from "@/components/Layout";

import List, { LoadingList } from "./List";

import styles from "./announcementContainer.module.scss";

export default async function AnnouncementContainer() {
  return (
    <ToastPositioner position={TOAST_BOTTOM_WITHOUT_BOTTOM_NAVIGATION}>
      <div className={styles.wrapper}>
        <BaseCenterHeader title="공지" />
        <main>
          <Suspense fallback={<LoadingList />}>
            <List />
          </Suspense>
        </main>
      </div>
    </ToastPositioner>
  );
}
