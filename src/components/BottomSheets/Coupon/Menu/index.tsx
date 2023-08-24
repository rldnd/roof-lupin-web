"use client";

import { type FormEventHandler, Suspense, useState } from "react";

import { useAtom } from "jotai";

import { BaseBottomSheet, Button } from "@/components/Common";
import { useTossPayment } from "@/hooks";
import { reservationCouponState } from "@/states";
import { getDiscountCost } from "@/utils/reservation";

import Content, { LoadingContent } from "./Content";

import styles from "./couponMenuBottomSheet.module.scss";

interface Props {
  isShow: boolean;
  originalCost: number;
  onClose(): void;
}

const CouponMenuBottomSheet: React.FC<Props> = ({ isShow, originalCost, onClose }) => {
  const { updatePrice } = useTossPayment();

  const [coupons, setCoupons] = useAtom(reservationCouponState);
  const [localCoupons, setLocalCoupons] = useState(coupons);

  const onReset = () => {
    setLocalCoupons([]);
  };

  const onSubmit: FormEventHandler<HTMLFormElement> = (e) => {
    e.preventDefault();
    setCoupons(localCoupons);

    if (localCoupons.length > 0) {
      updatePrice({ price: originalCost - getDiscountCost(originalCost, localCoupons), reason: "COUPON" });
    } else {
      updatePrice({ price: originalCost });
    }

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
          <Content localCoupons={localCoupons} setLocalCoupons={setLocalCoupons} />
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
