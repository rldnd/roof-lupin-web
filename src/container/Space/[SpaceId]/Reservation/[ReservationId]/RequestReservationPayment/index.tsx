import dynamic from "next/dynamic";

import { Header } from "./_sections";
import { LoadingView } from "./View";

import styles from "./requestReservationPaymentContainer.module.scss";

const View = dynamic(() => import("./View"), { ssr: false, loading: () => <LoadingView /> });

export default async function RequestReservationPayment() {
  return (
    <div className={styles.wrapper}>
      <Header />
      <View />
    </div>
  );
}
