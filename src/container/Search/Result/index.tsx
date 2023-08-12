import { TOAST_BOTTOM_WITH_BOTTOM_NAVIGATION } from "@/common/constants";
import { ToastPositioner } from "@/components";

import { Header } from "./_sections";

import styles from "./searchResultContainer.module.scss";

export default async function SearchResultContainer() {
  return (
    <ToastPositioner position={TOAST_BOTTOM_WITH_BOTTOM_NAVIGATION}>
      <div className={styles.wrapper}>
        <Header />
      </div>
    </ToastPositioner>
  );
}
