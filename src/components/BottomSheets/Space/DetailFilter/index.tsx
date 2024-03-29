"use client";

import { FormEventHandler, Suspense, useEffect, useState } from "react";

import { useAtom } from "jotai";

import { BaseBottomSheet } from "@/components/Common";
import { spaceSortMenuState } from "@/states";

import Footer from "./Footer";
import PaymentCategory from "./PaymentCategory";
import Service from "./Service";

import styles from "./spaceDetailFilterBottomSheet.module.scss";

interface Props {
  isShow: boolean;
  onClose: () => void;
}

const SpaceDetailFilterBottomSheet: React.FC<Props> = ({ isShow, onClose }) => {
  const [spaceSortMenu, setSpaceSortMenu] = useAtom(spaceSortMenuState);
  const [localMenu, setLocalMenu] = useState(spaceSortMenu);

  const onReset = () => {
    setLocalMenu((prev) => ({
      ...prev,
      serviceIds: null,
      minSize: null,
      maxSize: null,
      minPrice: null,
      maxPrice: null,
      isImmediateReservation: null,
    }));
  };

  const onSubmit: FormEventHandler<HTMLFormElement> = (e) => {
    e.preventDefault();

    setSpaceSortMenu(localMenu);
    onClose();
  };

  useEffect(() => {
    setLocalMenu(spaceSortMenu);
  }, [spaceSortMenu, isShow]);

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
          <Suspense fallback={null}>
            <Service serviceIds={localMenu.serviceIds} setLocalMenu={setLocalMenu} />
          </Suspense>
        </div>
        <Footer />
      </form>
    </BaseBottomSheet>
  );
};

export default SpaceDetailFilterBottomSheet;
