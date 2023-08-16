import Header from "./Header";
import View from "./View";

import styles from "./paymentSuccessContainer.module.scss";

// TODO: 접근을 위한 페이지 뎁스 추가
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
