import { Suspense } from "react";

import { Carousel, Header, LoadingCarousel, Review } from "./_sections";

import styles from "./reviewImageContainer.module.scss";

export default async function ReviewImageContainer() {
  return (
    <main className={styles.wrapper}>
      <Header />
      <Suspense fallback={<LoadingCarousel />}>
        <Carousel />
      </Suspense>
      <Suspense fallback={null}>
        <Review />
      </Suspense>
    </main>
  );
}
