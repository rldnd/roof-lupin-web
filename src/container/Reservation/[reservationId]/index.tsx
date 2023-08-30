import dynamic from "next/dynamic";

import { Header } from "./_shared";
import { LoadingView } from "./View";

import styles from "./reservationDetailContainer.module.scss";

const View = dynamic(() => import("./View"), { ssr: false, loading: () => <LoadingView /> });

export default async function ReservationDetailContainer() {
  return (
    <div className={styles.wrapper}>
      <Header />
      <main>
        <View />
      </main>
    </div>
  );
}
