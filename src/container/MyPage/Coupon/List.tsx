"use client";

import { range } from "lodash-es";

import type { UserCoupon } from "@/common/types/coupon";
import { UnorderedInfiniteScroll } from "@/components";
import { Coupon, LoadingCoupon } from "@/components/Coupon";
import { useSuspenseInfiniteQuery } from "@/hooks";
import { paginateCouponsApi } from "@/services/coupon";

import styles from "./list.module.scss";

const List: React.FC = () => {
  const { data, fetchNextPage, hasNextPage, isFetching, isSuccess } = useSuspenseInfiniteQuery<UserCoupon>(
    ["paginateCoupons"],
    ({ pageParam = 1 }) => paginateCouponsApi({ page: pageParam, limit: 10 }),
  );

  return (
    <UnorderedInfiniteScroll
      className={styles.wrapper}
      isFetching={isFetching}
      hasNextPage={hasNextPage}
      isSuccess={isSuccess}
      fetchNextPage={fetchNextPage}
      loadingComponent={<LoadingList />}
    >
      {data.pages.map((userCoupon) => (
        <Coupon key={userCoupon.id} userCoupon={userCoupon} />
      ))}
    </UnorderedInfiniteScroll>
  );
};

export default List;

export const LoadingList: React.FC = () => {
  return (
    <ul className={styles.wrapper}>
      {range(10).map((value) => (
        <LoadingCoupon key={value} />
      ))}
    </ul>
  );
};
