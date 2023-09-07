import dynamic from "next/dynamic";

import { TOAST_BOTTOM_WITHOUT_BOTTOM_NAVIGATION } from "@/common/constants";
import { ToastPositioner } from "@/components";

import { LoadingList } from "./List";
import { MyReviewLayout } from "../_shared";

import styles from "./myWriteReviewContainer.module.scss";

const List = dynamic(() => import("./List"), { ssr: false, loading: () => <LoadingList /> });

export default async function MyWriteReviewContainer() {
  return (
    <ToastPositioner position={TOAST_BOTTOM_WITHOUT_BOTTOM_NAVIGATION}>
      <MyReviewLayout>
        <main className={styles.wrapper}>
          <div className={styles.guideWrapper}>리뷰 작성은 이용완료일로부터 14일 이내 가능합니다.</div>
          <List />
        </main>
      </MyReviewLayout>
    </ToastPositioner>
  );
}
