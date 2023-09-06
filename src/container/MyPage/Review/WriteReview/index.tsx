import { TOAST_BOTTOM_WITHOUT_BOTTOM_NAVIGATION } from "@/common/constants";
import { ToastPositioner } from "@/components";

import { MyReviewLayout } from "../_shared";

import styles from "./myWriteReviewContainer.module.scss";

export default async function MyWriteReviewContainer() {
  return (
    <ToastPositioner position={TOAST_BOTTOM_WITHOUT_BOTTOM_NAVIGATION}>
      <MyReviewLayout>
        <main></main>
      </MyReviewLayout>
    </ToastPositioner>
  );
}
