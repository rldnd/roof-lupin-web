import { Suspense } from "react";

import { SafeArea } from "@/components";

import Content, { LoadingContent } from "./Content";
import Header from "./Header";
import Menu from "./Menu";

import styles from "./spaceDetailReviewContainer.module.scss";

export default function SpaceReviewContainer() {
  return (
    <SafeArea theme="dark">
      <div className={styles.wrapper}>
        <Header />
        <Suspense fallback={null}>
          <Menu />
        </Suspense>
        <Suspense fallback={<LoadingContent />}>
          <Content />
        </Suspense>
      </div>
    </SafeArea>
  );
}
