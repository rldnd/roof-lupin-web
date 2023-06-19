"use client";

import type { Review as ReviewType } from "@/common/types/review";
import { SpaceReview } from "@/components";
import { StarRatingItem } from "@/components/Common/StarRating";

import MoreButton from "./MoreButton";

import styles from "./review.module.scss";

interface Props {
  reviews: ReviewType[];
  averageScore: number;
  reviewCount: number;
}

const Review: React.FC<Props> = ({ averageScore, reviewCount, reviews }) => {
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
          <SpaceReview key={review.id} review={review} />
        ))}
      </ul>
      {reviewCount - reviews.length > 0 && <MoreButton count={reviewCount - reviews.length} />}
    </section>
  );
};

export default Review;
