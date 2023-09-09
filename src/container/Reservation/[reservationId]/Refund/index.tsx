import { TOAST_BOTTOM_WITHOUT_BOTTOM_NAVIGATION } from "@/common/constants";
import { ToastPositioner } from "@/components";
import { MinHeightFitLayout } from "@/components/Layout";

import { Form, Header } from "./_sections";

import styles from "./reservationRefundContainer.module.scss";

export default async function ReservationCancelContainer() {
  return (
    <ToastPositioner position={TOAST_BOTTOM_WITHOUT_BOTTOM_NAVIGATION}>
      <MinHeightFitLayout className={styles.wrapper}>
        <Header />
        <main>
          <p className={styles.info}>
            예약을 취소하시는 이유를
            <br />
            선택해주세요.
          </p>
          <Form />
        </main>
      </MinHeightFitLayout>
    </ToastPositioner>
  );
}
