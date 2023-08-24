"use client";

import type { Dispatch, MouseEventHandler, SetStateAction } from "react";

import { range } from "lodash-es";

import type { UserCoupon } from "@/common/types/coupon";
import { CouponMenu } from "@/components/Coupon";
import { LoadingCouponMenu } from "@/components/Coupon/CouponMenu";
import { UnorderedInfiniteScroll } from "@/components/InfiniteScroll";
import { useSuspenseInfiniteQuery } from "@/hooks";
import { paginateCouponsApi } from "@/services/coupon";
import type { ReservationCoupon } from "@/states";

import styles from "./content.module.scss";

interface Props {
  localCoupons: ReservationCoupon[];
  setLocalCoupons: Dispatch<SetStateAction<ReservationCoupon[]>>;
}

const Content: React.FC<Props> = ({ localCoupons, setLocalCoupons }) => {
  const { data, isSuccess, isFetching, hasNextPage, fetchNextPage } = useSuspenseInfiniteQuery<UserCoupon>(
    ["paginateCoupons"],
    ({ pageParam = 1 }) => paginateCouponsApi({ page: pageParam, limit: 10 }),
  );

  const onClick: MouseEventHandler<HTMLButtonElement> = (e) => {
    const { value } = e.currentTarget;
    const coupon = data.pages.flat().find((userCoupon) => userCoupon.id === value);
    if (coupon) setLocalCoupons((prev) => [...prev, coupon]);
  };

  return (
    <UnorderedInfiniteScroll
      className={styles.wrapper}
      isSuccess={isSuccess}
      isFetching={isFetching}
      hasNextPage={hasNextPage}
      fetchNextPage={fetchNextPage}
      isRootContainer
      loadingComponentInList={<LoadingList />}
    >
      {data.pages.map((userCoupon) => (
        <CouponMenu
          value={userCoupon.id}
          key={userCoupon.id}
          userCoupon={userCoupon}
          onClick={onClick}
          active={localCoupons.some((localCoupon) => localCoupon.id === userCoupon.id)}
        />
      ))}
    </UnorderedInfiniteScroll>
  );
};

export default Content;

export const LoadingList: React.FC = () => {
  return (
    <>
      {range(10).map((value) => (
        <LoadingCouponMenu key={value} />
      ))}
    </>
  );
};

export const LoadingContent: React.FC = () => {
  return (
    <div className={styles.wrapper}>
      <LoadingList />
    </div>
  );
};
