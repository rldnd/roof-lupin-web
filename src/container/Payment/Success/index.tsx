import Header from "./Header";
import View from "./View";

import styles from "./paymentSuccessContainer.module.scss";

export default async function PaymentSuccessContainer() {
  return (
    <div className={styles.wrapper}>
      <Header />
      <main className={styles.content}>
        <View />
      </main>
    </div>
  );
}
