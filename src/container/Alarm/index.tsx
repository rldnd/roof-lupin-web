import dynamic from "next/dynamic";

import { BaseCenterHeader } from "@/components/Layout";

import styles from "./alarmContainer.module.scss";

// TODO: loading
const List = dynamic(() => import("./List"), { ssr: false });

export default async function AlarmContainer() {
  return (
    <div className={styles.wrapper}>
      <BaseCenterHeader title="알림" />
      <List />
    </div>
  );
}
