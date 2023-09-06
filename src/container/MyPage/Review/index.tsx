import { TOAST_BOTTOM_WITHOUT_BOTTOM_NAVIGATION } from "@/common/constants";
import { ToastPositioner } from "@/components";

import { MyReviewLayout } from "./_shared";

import styles from "./myReviewContainer.module.scss";

export default async function MyReviewContainer() {
  return (
    <ToastPositioner position={TOAST_BOTTOM_WITHOUT_BOTTOM_NAVIGATION}>
      <MyReviewLayout>
        <main className={styles.wrapper}></main>
      </MyReviewLayout>
    </ToastPositioner>
  );
}
