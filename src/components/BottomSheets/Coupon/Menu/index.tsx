"use client";

import { ChangeEventHandler, FormEventHandler, MouseEventHandler, Suspense, useState } from "react";

import { useAtom, useSetAtom } from "jotai";

import { BaseBottomSheet, Button } from "@/components/Common";
import { reservationState } from "@/states";

import Content, { LoadingContent } from "./Content";

import styles from "./couponMenuBottomSheet.module.scss";

interface Props {
  isShow: boolean;
  onClose(): void;
}

const CouponMenuBottomSheet: React.FC<Props> = ({ isShow, onClose }) => {
  const [reservation, setReservation] = useAtom(reservationState);
  const [localCouponIds, setLocalCouponIds] = useState(reservation.userCouponIds);

  const onReset = () => {
    setLocalCouponIds(null);
  };

  const onClick: MouseEventHandler<HTMLButtonElement> = (e) => {
    const { value } = e.currentTarget;
    console.log({ value });
    setLocalCouponIds([value]);
  };

  const onSubmit: FormEventHandler<HTMLFormElement> = (e) => {
    e.preventDefault();
    setReservation({ ...reservation, userCouponIds: localCouponIds });
    onClose();
  };

  return (
    <BaseBottomSheet
      isShow={isShow}
      onClose={onClose}
      blockWindowScroll
      isHeightMax
      className={styles.wrapper}
      title="쿠폰"
    >
      <form onSubmit={onSubmit} onReset={onReset}>
        <Suspense fallback={<LoadingContent />}>
          <Content localCouponIds={localCouponIds} onClick={onClick} />
        </Suspense>
        <footer className={styles.footer}>
          <Button type="reset" color="bw">
            적용안함
          </Button>
          <Button type="submit" color="primary">
            적용하기
          </Button>
        </footer>
      </form>
    </BaseBottomSheet>
  );
};

export default CouponMenuBottomSheet;
