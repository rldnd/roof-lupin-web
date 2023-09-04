import Header from "./Header";
import TabBar from "./TabBar";

import styles from "./myReservationContainer.module.scss";

export default async function MyReservationContainer() {
  return (
    <div className={styles.wrapper}>
      <Header />
      <TabBar />
    </div>
  );
}
