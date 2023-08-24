"use client";

import type { MouseEventHandler } from "react";

import { range } from "lodash-es";

import type { UserCoupon } from "@/common/types/coupon";
import { CouponMenu } from "@/components/Coupon";
import { LoadingCouponMenu } from "@/components/Coupon/CouponMenu";
import { UnorderedInfiniteScroll } from "@/components/InfiniteScroll";
import { useSuspenseInfiniteQuery } from "@/hooks";
import { paginateCouponsApi } from "@/services/coupon";

import styles from "./content.module.scss";

interface Props {
  localCouponIds: string[] | null;
  onClick: MouseEventHandler<HTMLButtonElement>;
}

const Content: React.FC<Props> = ({ localCouponIds, onClick }) => {
  const { data, isSuccess, isFetching, hasNextPage, fetchNextPage } = useSuspenseInfiniteQuery<UserCoupon>(
    ["paginateCoupons"],
    ({ pageParam = 1 }) => paginateCouponsApi({ page: pageParam, limit: 10 }),
  );

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
          active={Array.isArray(localCouponIds) && userCoupon.id === localCouponIds[0]}
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
