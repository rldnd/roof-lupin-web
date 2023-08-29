import dynamic from "next/dynamic";

import { LoadingBottomSection } from "./BottomSection";
import Header from "./Header";
import { LoadingTopSection } from "./TopSection";

import styles from "./reservationPaymentSuccessContainer.module.scss";

const TopSection = dynamic(() => import("./TopSection"), { ssr: false, loading: () => <LoadingTopSection /> });
const BottomSection = dynamic(() => import("./BottomSection"), { ssr: false, loading: () => <LoadingBottomSection /> });

export default async function ReservationPaymentSuccessContainer() {
  return (
    <div className={styles.wrapper}>
      <Header />
      <main className={styles.content}>
        <TopSection />
        <hr />
        <BottomSection />
      </main>
    </div>
  );
}
