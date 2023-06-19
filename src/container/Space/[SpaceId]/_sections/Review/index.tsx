import type { Review as ReviewType } from "@/common/types/review";
import { StarRatingItem } from "@/components/Common/StarRating";

import styles from "./review.module.scss";

interface Props {
  reviews: ReviewType[];
  reviewCount: number;
  score: number;
}

const Review: React.FC<Props> = ({ reviews, score, reviewCount }) => {
  return (
    <section id="review-section" className={styles.wrapper}>
      <h2>
        <StarRatingItem
          className={styles.starRatingItem}
          score={score}
          reviewCount={reviewCount}
          viewReviewCount={false}
        />
        <span className={styles.reviewCount}>{reviewCount}개 리뷰</span>
      </h2>
    </section>
  );
};

export default Review;
