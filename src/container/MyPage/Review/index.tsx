import dynamic from "next/dynamic";

import { TOAST_BOTTOM_WITHOUT_BOTTOM_NAVIGATION } from "@/common/constants";
import { ToastPositioner } from "@/components";

import { MyReviewLayout } from "./_shared";
import { LoadingList } from "./List";

import styles from "./myReviewContainer.module.scss";

const List = dynamic(() => import("./List"), { ssr: false, loading: () => <LoadingList /> });

export default async function MyReviewContainer() {
  return (
    <ToastPositioner position={TOAST_BOTTOM_WITHOUT_BOTTOM_NAVIGATION}>
      <MyReviewLayout>
        <main className={styles.wrapper}>
          <List />
        </main>
      </MyReviewLayout>
    </ToastPositioner>
  );
}
