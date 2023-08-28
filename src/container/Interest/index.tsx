import dynamic from "next/dynamic";

import { TOAST_BOTTOM_WITH_BOTTOM_NAVIGATION } from "@/common/constants/toast";
import { ToastPositioner } from "@/components";
import { BaseHeader, BottomNavigation } from "@/components/Layout";

import { LoadingInterestList } from "./InterestList";

import styles from "./interestContainer.module.scss";

const InterestList = dynamic(() => import("./InterestList"), { ssr: false, loading: () => <LoadingInterestList /> });

export default async function InterestContainer() {
  return (
    <ToastPositioner position={TOAST_BOTTOM_WITH_BOTTOM_NAVIGATION}>
      <main className={styles.wrapper}>
        <BaseHeader title="찜" backHidden className={styles.header} />
        <InterestList />
        <BottomNavigation />
      </main>
    </ToastPositioner>
  );
}
