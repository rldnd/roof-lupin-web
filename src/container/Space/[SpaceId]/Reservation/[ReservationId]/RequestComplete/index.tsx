import Header from "./Header";
import TopSection from "./TopSection";

import styles from "./requestReservationCompleteContainer.module.scss";

export default async function RequestReservationCompleteContainer() {
  return (
    <div className={styles.wrapper}>
      <Header />
      <main className={styles.content}>
        <TopSection />
        <hr />
      </main>
    </div>
  );
}
