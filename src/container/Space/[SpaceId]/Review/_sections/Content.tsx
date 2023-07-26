"use client";

import { useParams } from "next/navigation";

import { useAtomValue } from "jotai";
import { range } from "lodash-es";

import { Review } from "@/common/types/review";
import { SpaceReview, UnorderedInfiniteScroll } from "@/components";
import { LoadingSpaceReview } from "@/components/Space/Review";
import { useSuspenseInfiniteQuery } from "@/hooks";
import { paginateReviewsApi } from "@/services/review";
import { reviewSortMenuState } from "@/states";

import styles from "./content.module.scss";

const Content: React.FC = () => {
  const { spaceId } = useParams();
  const reviewSortMenu = useAtomValue(reviewSortMenuState);
  const { data, isFetching, isSuccess, hasNextPage, fetchNextPage } = useSuspenseInfiniteQuery<Review>(
    ["paginateReviews", reviewSortMenu],
    ({ pageParam = 1 }) => paginateReviewsApi({ page: pageParam, limit: 10, ...reviewSortMenu, spaceId }),
    {
      enabled: Boolean(spaceId),
    },
  );

  return (
    <main className={styles.wrapper}>
      <UnorderedInfiniteScroll
        className={styles.reviewList}
        fetchNextPage={fetchNextPage}
        hasNextPage={hasNextPage}
        isFetching={isFetching}
        isSuccess={isSuccess}
        loadingComponent={<LoadingContent />}
      >
        {data.pages.map((review) => (
          <SpaceReview spaceId={spaceId} className={styles.review} key={review.id} isShowAll review={review} />
        ))}
      </UnorderedInfiniteScroll>
    </main>
  );
};

export default Content;

export const LoadingContent: React.FC = () => {
  return (
    <div className={styles.reviewList}>
      {range(5).map((value) => (
        <LoadingSpaceReview className={styles.review} key={value} />
      ))}
    </div>
  );
};
