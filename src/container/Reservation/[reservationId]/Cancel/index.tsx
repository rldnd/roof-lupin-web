import { TOAST_BOTTOM_WITHOUT_BOTTOM_NAVIGATION } from "@/common/constants";
import { ToastPositioner } from "@/components";
import { MinHeightFitLayout } from "@/components/Layout";

import Form from "./Form";
import Header from "./Header";

import styles from "./reservationCancelContainer.module.scss";

export default async function ReservationCancelContainer() {
  return (
    <ToastPositioner position={TOAST_BOTTOM_WITHOUT_BOTTOM_NAVIGATION}>
      <MinHeightFitLayout className={styles.wrapper}>
        <Header />
        <main>
          <p className={styles.info}>
            취소를 신청하시는 이유를
            <br />
            선택해주세요.
          </p>
          <Form />
        </main>
      </MinHeightFitLayout>
    </ToastPositioner>
  );
}
