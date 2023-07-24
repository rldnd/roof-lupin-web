import { Suspense } from "react";

import { TOAST_BOTTOM_WITH_BOTTOM_NAVIGATION } from "@/common/constants/toast";
import { ToastPositioner } from "@/components";
import { BaseHeader, BottomNavigation } from "@/components/Layout";

import InterestList from "./InterestList";

import styles from "./interestContainer.module.scss";

export default async function InterestContainer() {
  return (
    <ToastPositioner position={TOAST_BOTTOM_WITH_BOTTOM_NAVIGATION}>
      <main className={styles.wrapper}>
        <BaseHeader title="찜 리스트" backHidden className={styles.header} />
        <Suspense fallback={null}>
          <InterestList />
        </Suspense>
        <BottomNavigation />
      </main>
    </ToastPositioner>
  );
}
