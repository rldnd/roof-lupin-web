"use client";

import { useParams } from "next/navigation";

import { UserCouponCount } from "@/common/types/coupon";
import { useSuspenseQuery } from "@/hooks";
import { getSpaceCouponsCountApi } from "@/services/coupon";

import { IconGrayRightChevronLarge } from "public/icons";

import styles from "./discount.module.scss";

const Discount: React.FC = () => {
  const { spaceId } = useParams();
  const { data } = useSuspenseQuery<UserCouponCount>(["getSpaceCouponsCount"], () => getSpaceCouponsCountApi(spaceId));

  return (
    <section className={styles.wrapper}>
      <h2>할인</h2>
      <button type="button" className={styles.couponButton}>
        <span>
          쿠폰 할인
          <span className={styles.currentCoupons}>
            (전체 {data.totalCount}장, 적용가능 {data.availableCount}장)
          </span>
        </span>
        <IconGrayRightChevronLarge />
      </button>
    </section>
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
