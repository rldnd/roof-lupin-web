import { TOAST_BOTTOM_WITHOUT_BOTTOM_NAVIGATION } from "@/common/constants";
import { ToastPositioner } from "@/components";

import Header from "./Header";

import styles from "./myProfileContainer.module.scss";

export default async function MyProfileContainer() {
  return (
    <ToastPositioner position={TOAST_BOTTOM_WITHOUT_BOTTOM_NAVIGATION}>
      <div className={styles.wrapper}>
        <Header />
        <main></main>
      </div>
    </ToastPositioner>
  );
}
