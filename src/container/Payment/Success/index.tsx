import React, { Suspense } from "react";

import View from "./View";

import styles from "./paymentSuccessContainer.module.scss";

// TODO: server component & client component 분리
const PaymentSuccessContainer: React.FC = () => {
  return (
    <main className={styles.wrapper}>
      <Suspense fallback={null}>
        <View />
      </Suspense>
    </main>
  );
};

export default PaymentSuccessContainer;
