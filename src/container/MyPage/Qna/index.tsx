import dynamic from "next/dynamic";

import { TOAST_BOTTOM_WITHOUT_BOTTOM_NAVIGATION } from "@/common/constants";
import { ToastPositioner } from "@/components";
import { BaseCenterHeader } from "@/components/Layout";

import { LoadingList } from "./List";
import { LoadingTabBar } from "./TabBar";

import styles from "./myQnaContainer.module.scss";

const TabBar = dynamic(() => import("./TabBar"), { ssr: false, loading: () => <LoadingTabBar /> });
const List = dynamic(() => import("./List"), { ssr: false, loading: () => <LoadingList /> });

export default async function MyQnaContainer() {
  return (
    <ToastPositioner position={TOAST_BOTTOM_WITHOUT_BOTTOM_NAVIGATION}>
      <div className={styles.wrapper}>
        <BaseCenterHeader title="내 Q&A" href="/my-page" />
        <TabBar />
        <main>
          <List />
        </main>
      </div>
    </ToastPositioner>
  );
}
