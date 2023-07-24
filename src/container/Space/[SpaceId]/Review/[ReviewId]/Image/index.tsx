import { Suspense } from "react";

import { TOAST_BOTTOM_WITHOUT_BOTTOM_NAVIGATION } from "@/common/constants/toast";
import { ToastPositioner } from "@/components";

import { Carousel, Header, LoadingCarousel, Review } from "./_sections";

import styles from "./reviewImageContainer.module.scss";

export default async function ReviewImageContainer() {
  return (
    <ToastPositioner position={TOAST_BOTTOM_WITHOUT_BOTTOM_NAVIGATION}>
      <main className={styles.wrapper}>
        <Header />
        <Suspense fallback={<LoadingCarousel />}>
          <Carousel />
        </Suspense>
        <Suspense fallback={null}>
          <Review />
        </Suspense>
      </main>
    </ToastPositioner>
  );
}
