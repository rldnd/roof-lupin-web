"use client";

import { BaseBottomSheet } from "@/components/Common";

import Footer from "./Footer";
import PaymentCategory from "./PaymentCategory";

import styles from "./categoryDetailFilterBottomSheet.module.scss";

interface Props {
  isShow: boolean;
  onClose: () => void;
}

const CategoryDetailFilterBottomSheet: React.FC<Props> = ({ isShow, onClose }) => {
  return (
    <BaseBottomSheet
      title="상세 필터"
      isShow={isShow}
      onClose={onClose}
      shouldCloseOnOverlayClick={false}
      wrapperClassName={styles.sheetWrapper}
      blockWindowScroll
      className={styles.wrapper}
      isHeightMax
    >
      <form>
        <div className={styles.content}>
          <PaymentCategory />
        </div>
        <Footer />
      </form>
    </BaseBottomSheet>
  );
};

export default CategoryDetailFilterBottomSheet;
