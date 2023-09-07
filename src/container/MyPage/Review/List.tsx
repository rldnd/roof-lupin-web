"use client";

import { range } from "lodash-es";

import type { Review } from "@/common/types/review";
import { LoadingMySpaceReview, MySpaceReview, UnorderedInfiniteScroll } from "@/components";
import { useSuspenseInfiniteQuery } from "@/hooks";
import { paginateMyReviewsApi } from "@/services/review";

import styles from "./list.module.scss";

const List: React.FC = () => {
  const { data, isFetching, isSuccess, hasNextPage, fetchNextPage } = useSuspenseInfiniteQuery<Review>(
    ["paginateMyReviews"],
    ({ pageParam = 1 }) => paginateMyReviewsApi({ page: pageParam, limit: 10 }),
  );

  return (
    <UnorderedInfiniteScroll
      hasNextPage={hasNextPage}
      isSuccess={isSuccess}
      isFetching={isFetching}
      fetchNextPage={fetchNextPage}
      className={styles.wrapper}
      loadingComponentInList={<LoadingItems />}
    >
      {data.pages.map((review) => (
        <MySpaceReview key={review.id} review={review} className={styles.item} />
      ))}
    </UnorderedInfiniteScroll>
  );
};

export default List;

export const LoadingItems: React.FC = () => {
  return (
    <>
      {range(10).map((value) => (
        <LoadingMySpaceReview key={value} className={styles.item} />
      ))}
    </>
  );
};

export const LoadingList: React.FC = () => {
  return (
    <ul className={styles.wrapper}>
      <LoadingItems />
    </ul>
  );
};
