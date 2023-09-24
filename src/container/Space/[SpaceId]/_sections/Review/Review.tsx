"use client";

import { useParams } from "next/navigation";

import type { Review as ReviewType } from "@/common/types/review";
import { SpaceReview } from "@/components";
import { StarRatingItem } from "@/components/Common/StarRating";
import { revalidateApi } from "@/services/revalidate";

import MoreButton from "./MoreButton";

import styles from "./review.module.scss";

interface Props {
  reviews: ReviewType[];
  averageScore: number;
  reviewCount: number;
}

const Review: React.FC<Props> = ({ averageScore, reviewCount, reviews }) => {
  const { spaceId } = useParams();

  const refetch = async () => {
    await revalidateApi({ tag: `/spaces/${spaceId}/detail` });
  };

  return (
    <section id="review-section" className={styles.wrapper}>
      <h2>
        <StarRatingItem
          starSize={24}
          className={styles.starRatingItem}
          score={averageScore}
          reviewCount={reviewCount}
          viewReviewCount={false}
        />
        <span className={styles.reviewCount}>{reviewCount}개 리뷰</span>
      </h2>
      <ul className={styles.reviewList}>
        {reviews.map((review) => (
          <SpaceReview spaceId={spaceId} key={review.id} review={review} refetch={refetch} />
        ))}
      </ul>
      {reviewCount - reviews.length > 0 && <MoreButton count={reviewCount - reviews.length} />}
    </section>
  );
};

export default Review;
