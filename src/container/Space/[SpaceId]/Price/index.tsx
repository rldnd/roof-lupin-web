import { Suspense } from "react";

import { BaseHeader } from "@/components/Layout";

import Info, { LoadingInfo } from "./Info";
import TimeAndPackage, { LoadingTimeAndPackage } from "./TimeAndPackage";

import styles from "./spacePriceContainer.module.scss";

export default async function SpacePriceContainer() {
  return (
    <div className={styles.wrapper}>
      <BaseHeader title="상세 요금" />
      <Suspense fallback={<LoadingInfo />}>
        <Info />
      </Suspense>
      <hr className={styles.info} />
      <Suspense fallback={<LoadingTimeAndPackage />}>
        <TimeAndPackage />
      </Suspense>
    </div>
  );
}
