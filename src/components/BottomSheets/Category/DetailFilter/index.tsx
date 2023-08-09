"use client";

import { FormEventHandler, useState } from "react";

import { useAtom } from "jotai";

import { BaseBottomSheet } from "@/components/Common";
import { categorySortMenuState } from "@/states";

import Footer from "./Footer";
import PaymentCategory from "./PaymentCategory";
import Price from "./Price";

import styles from "./categoryDetailFilterBottomSheet.module.scss";

interface Props {
  isShow: boolean;
  onClose: () => void;
}

const CategoryDetailFilterBottomSheet: React.FC<Props> = ({ isShow, onClose }) => {
  const [categorySortMenu, setCategorySortMenu] = useAtom(categorySortMenuState);
  const [localMenu, setLocalMenu] = useState(categorySortMenu);

  const onReset = () => {};

  const onSubmit: FormEventHandler<HTMLFormElement> = (e) => {
    e.preventDefault();

    setCategorySortMenu(localMenu);
    onClose();
  };

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
      <form onSubmit={onSubmit} onReset={onReset}>
        <div className={styles.content}>
          <PaymentCategory isImmediateReservation={localMenu.isImmediateReservation} setLocalMenu={setLocalMenu} />
          <Price />
        </div>
        <Footer />
      </form>
    </BaseBottomSheet>
  );
};

export default CategoryDetailFilterBottomSheet;
