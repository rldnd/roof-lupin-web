"use client";

import { useState } from "react";

import type { UserCouponCount } from "@/common/types/coupon";
import { CouponMenuBottomSheet } from "@/components/BottomSheets/Coupon";
import { useSuspenseQuery } from "@/hooks";
import { getCouponsCountApi } from "@/services/coupon";

import { IconGrayRightChevronLarge } from "public/icons";

import styles from "./discount.module.scss";

const Discount: React.FC = () => {
  const [isShowMenu, setIsShowMenu] = useState(false);
  const { data } = useSuspenseQuery<UserCouponCount>(["getSpaceCouponsCount"], getCouponsCountApi);

  const onClickCouponButton = () => {
    if (data.count === 0) return;
    setIsShowMenu(true);
  };

  return (
    <>
      <section className={styles.wrapper}>
        <h2>할인</h2>
        <button type="button" className={styles.couponButton} onClick={onClickCouponButton}>
          <span>
            쿠폰 할인
            <span className={styles.currentCoupons}>(전체 {data.count}장)</span>
          </span>
          <IconGrayRightChevronLarge />
        </button>
      </section>
      <CouponMenuBottomSheet isShow={isShowMenu} onClose={() => setIsShowMenu(false)} />
    </>
  );
};

export default Discount;

export const LoadingDiscount: React.FC = () => {
  return (
    <section className={styles.wrapper}>
      <h2>할인</h2>
      <button type="button" className={styles.couponButton} disabled>
        <span>쿠폰 할인</span>
        <IconGrayRightChevronLarge />
      </button>
    </section>
  );
};
