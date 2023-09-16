import { BaseCenterHeader } from "@/components/Layout";

import styles from "./alarmContainer.module.scss";

export default async function AlarmContainer() {
  return (
    <div className={styles.wrapper}>
      <BaseCenterHeader title="알림" />
    </div>
  );
}
