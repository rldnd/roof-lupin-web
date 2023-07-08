import { Suspense } from "react";

import { Content, Header, LoadingContent, Menu } from "./_sections";

import styles from "./spaceDetailReviewContainer.module.scss";

export default function SpaceReviewContainer() {
  return (
    <div className={styles.wrapper}>
      <Header />
      <Suspense fallback={null}>
        <Menu />
      </Suspense>
      <Suspense fallback={<LoadingContent />}>
        <Content />
      </Suspense>
    </div>
  );
}
