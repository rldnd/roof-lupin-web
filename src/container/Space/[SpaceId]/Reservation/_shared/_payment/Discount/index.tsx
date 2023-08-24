"use client";

import { useState } from "react";

import { useParams } from "next/navigation";

import cx from "clsx";
import { useAtomValue } from "jotai";

import type { UserCouponCount } from "@/common/types/coupon";
import type { SpaceDetail } from "@/common/types/space";
import { CouponMenuBottomSheet } from "@/components/BottomSheets/Coupon";
import { useSuspenseQuery } from "@/hooks";
import { getCouponsCountApi } from "@/services/coupon";
import { getClientSpaceApi } from "@/services/space";
import {
  reservationAdditionalServicesState,
  reservationCouponState,
  reservationPackageState,
  reservationState,
  reservationTimeState,
} from "@/states";
import { getCouponPrice } from "@/utils/coupon";
import { getOriginalCost } from "@/utils/reservation";

import { IconGrayRightChevronLarge } from "public/icons";

import styles from "./discount.module.scss";

const Discount: React.FC = () => {
  const { spaceId } = useParams();

  const { data } = useSuspenseQuery<UserCouponCount>(["getSpaceCouponsCount"], getCouponsCountApi);
  const { data: space } = useSuspenseQuery<SpaceDetail>(["getClientSpace", spaceId], () => getClientSpaceApi(spaceId));

  const reservation = useAtomValue(reservationState);
  const time = useAtomValue(reservationTimeState);
  const packages = useAtomValue(reservationPackageState);
  const additionalServices = useAtomValue(reservationAdditionalServicesState);
  const coupons = useAtomValue(reservationCouponState);

  const [isShowMenu, setIsShowMenu] = useState(false);

  const originalCost = getOriginalCost(
    time,
    packages,
    additionalServices,
    reservation.userCount ?? 0,
    space.overflowUserCost,
    space.overflowUserCount,
  );

  const onClickCouponButton = () => {
    if (data.count === 0) return;
    setIsShowMenu(true);
  };

  return (
    <>
      <section className={styles.wrapper}>
        <h2>할인</h2>
        <button
          type="button"
          className={cx(styles.couponButton, { [styles.active]: coupons.length > 0 })}
          onClick={onClickCouponButton}
          disabled={data.count === 0}
        >
          <span>
            쿠폰 할인
            <span className={styles.currentCoupons}>
              {coupons.length === 0 && `(전체 ${data.count}장)`}
              {coupons.length > 0 && `(${getCouponPrice(coupons[0])} 할인)`}
            </span>
          </span>
          <IconGrayRightChevronLarge />
        </button>
      </section>
      <CouponMenuBottomSheet isShow={isShowMenu} originalCost={originalCost} onClose={() => setIsShowMenu(false)} />
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
