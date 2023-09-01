import { TOAST_BOTTOM_WITHOUT_BOTTOM_NAVIGATION } from "@/common/constants";
import { ToastPositioner } from "@/components";

import Form from "./Form";
import Header from "./Header";

import styles from "./myCouponContainer.module.scss";

export default async function MyCouponContainer() {
  return (
    <ToastPositioner position={TOAST_BOTTOM_WITHOUT_BOTTOM_NAVIGATION}>
      <div className={styles.wrapper}>
        <Header />
        <main>
          <Form />
        </main>
      </div>
    </ToastPositioner>
  );
}
