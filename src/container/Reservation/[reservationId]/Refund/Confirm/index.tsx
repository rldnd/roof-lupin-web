import dynamic from "next/dynamic";

import { LoadingView } from "./View";
import { Header } from "../../_shared";

import styles from "./reservationRefundConfirmContainer.module.scss";

const View = dynamic(() => import("./View"), { ssr: false, loading: () => <LoadingView /> });

export default async function ReservationRefundConfirmContainer() {
  return (
    <div className={styles.wrapper}>
      <Header title="예약 취소" />
      <main>
        <View />
      </main>
    </div>
  );
}
