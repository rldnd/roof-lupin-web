import { Suspense } from "react";

import { Carousel, Header, LoadingCarousel } from "./_sections";

import styles from "./reviewImageContainer.module.scss";

export default async function ReviewImageContainer() {
  return (
    <main className={styles.wrapper}>
      <Header />
      <Suspense fallback={<LoadingCarousel />}>
        <Carousel />
      </Suspense>
    </main>
  );
}
