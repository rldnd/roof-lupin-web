import { Suspense } from "react";

import { TOAST_BOTTOM_WITH_BOTTOM_NAVIGATION } from "@/common/constants";
import { ToastPositioner } from "@/components";

import { Content, Filter, Header } from "./_sections";

import styles from "./searchResultContainer.module.scss";

export default async function SearchResultContainer() {
  return (
    <ToastPositioner position={TOAST_BOTTOM_WITH_BOTTOM_NAVIGATION}>
      <div className={styles.wrapper}>
        <Suspense fallback={null}>
          <Header />
        </Suspense>
        <Filter />
        <Content />
      </div>
    </ToastPositioner>
  );
}
