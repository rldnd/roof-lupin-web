import { TOAST_BOTTOM_WITHOUT_BOTTOM_NAVIGATION } from "@/common/constants";
import { ToastPositioner } from "@/components";
import { BottomNavigation, Footer } from "@/components/Layout";

import { Info } from "./_sections";

import styles from "./myPage.module.scss";

export default async function MyContainer() {
  return (
    <ToastPositioner position={TOAST_BOTTOM_WITHOUT_BOTTOM_NAVIGATION}>
      <div className={styles.wrapper}>
        <main>
          <Info />
        </main>
        <Footer />
        <BottomNavigation />
      </div>
    </ToastPositioner>
  );
}
