import dynamic from "next/dynamic";

import { BaseCenterHeader } from "@/components/Layout";

import { LoadingList } from "./List";

import styles from "./alarmContainer.module.scss";

const List = dynamic(() => import("./List"), { ssr: false, loading: () => <LoadingList /> });

export default async function AlarmContainer() {
  return (
    <div className={styles.wrapper}>
      <BaseCenterHeader title="알림" />
      <List />
    </div>
  );
}
