import { BaseHeader, BottomNavigation } from "@/components/Layout";

import styles from "./interestContainer.module.scss";

export default async function InterestContainer() {
  return (
    <main className={styles.wrapper}>
      <BaseHeader title="찜 리스트" backHidden className={styles.header} />
      <BottomNavigation />
    </main>
  );
}
