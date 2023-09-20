import { TOAST_BOTTOM_WITHOUT_BOTTOM_NAVIGATION } from "@/common/constants";
import { ToastPositioner } from "@/components";
import { MinHeightFitLayout } from "@/components/Layout";

import Form from "./Form";
import Header from "./Header";

import styles from "./spaceReportContainer.module.scss";

export default async function SpaceReportContainer() {
  return (
    <ToastPositioner position={TOAST_BOTTOM_WITHOUT_BOTTOM_NAVIGATION}>
      <MinHeightFitLayout className={styles.wrapper}>
        <Header />
        <main>
          <p className={styles.info}>
            이 공간을 신고하시는
            <br />
            이유를 선택해주세요.
          </p>
          <Form />
        </main>
      </MinHeightFitLayout>
    </ToastPositioner>
  );
}
