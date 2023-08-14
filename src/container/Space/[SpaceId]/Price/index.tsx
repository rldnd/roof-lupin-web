import dynamic from "next/dynamic";

import { TOAST_BOTTOM_WITHOUT_BOTTOM_NAVIGATION } from "@/common/constants";
import { ToastPositioner } from "@/components";
import { BaseHeader } from "@/components/Layout";

import { LoadingInfo } from "./Info";
import { LoadingTimeAndPackage } from "./TimeAndPackage";

import styles from "./spacePriceContainer.module.scss";

const Info = dynamic(() => import("./Info"), { ssr: false, loading: () => <LoadingInfo /> });

const TimeAndPackage = dynamic(() => import("./TimeAndPackage"), {
  ssr: false,
  loading: () => <LoadingTimeAndPackage />,
});

export default async function SpacePriceContainer() {
  return (
    <ToastPositioner position={TOAST_BOTTOM_WITHOUT_BOTTOM_NAVIGATION}>
      <div className={styles.wrapper}>
        <BaseHeader title="상세 요금" />
        <Info />
        <hr className={styles.info} />
        <TimeAndPackage />
      </div>
    </ToastPositioner>
  );
}
