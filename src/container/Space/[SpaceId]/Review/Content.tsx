"use client";

import { useParams } from "next/navigation";

import { useAtomValue } from "jotai";

import { Review } from "@/common/types/review";
import { SpaceReview } from "@/components";
import { useSuspenseInfiniteQuery } from "@/hooks";
import { paginateReviewsApi } from "@/services/review";
import { reviewSortMenuState } from "@/states/review";

import styles from "./content.module.scss";

const Content: React.FC = () => {
  const { spaceId } = useParams();
  const reviewSortMenu = useAtomValue(reviewSortMenuState);
  const { data } = useSuspenseInfiniteQuery<Review>(
    ["paginateReviews", reviewSortMenu.hasPhoto, reviewSortMenu.sort],
    ({ pageParam = 1 }) => paginateReviewsApi({ page: pageParam, ...reviewSortMenu, spaceId, limit: 10 }),
    {
      enabled: Boolean(spaceId),
    },
  );

  return (
    <main className={styles.wrapper}>
      <ul className={styles.reviewList}>
        {data.pages.map((review) => (
          <SpaceReview key={review.id} isShowAll review={review} />
        ))}
      </ul>
    </main>
  );
};

export default Content;

export const LoadingContent: React.FC = () => {
  return <></>;
};
